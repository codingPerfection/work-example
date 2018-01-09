import { settings } from './../Settings';
import { auth } from './Auth';






class Request {
  //helper functions only used for testing when setting.trackRequests == true
  apiCallsFinishedCallbacks = []
  unresolvedRequests = 0
  delayedRequests = []
  //tracks how many calls are in progress
  /* istanbul ignore next */
  makeTrackedRequest(url, type, data, authRequest) {
    let promise = this.makeRequest(url, type, data, authRequest);
    if (settings.trackRequests) {
      this.unresolvedRequests++;
      promise.then(() => {
        this.unresolvedRequests--;
        if (this.unresolvedRequests === 0) {
          this.apiCallsFinishedCallbacks.forEach((resolve) => { resolve() })
        }
      });
    }
    //if we want to delay requests we need to return new promise that gets solved when calling resolveDelayedRequest
    if (settings.delayRequests) {
      let resolve2;
      let promise2 = new Promise((resolve, reject2) => {
        resolve2 = resolve;
      })
      promise.then((data, error) => {
        this.delayedRequests.push({ promise: promise2, resolve: resolve2, data: data });
      })
      return promise2;
    } else {
      return promise;
    }
  }
  //gives promise that resolves when all api calls are finish
  /* istanbul ignore next */
  waitForApiCallsFinish() {
    if (this.unresolvedRequests === 0) {
      return Promise.resolve();
    } else {
      return new Promise((resolve) => this.apiCallsFinishedCallbacks.push(resolve));
    }
  }
  //resolve all delayed request
  /* istanbul ignore next */
  resolveDelayedRequest() {
    return new Promise((resolvePromise, reject) => {
      let count = this.delayedRequests.length;
      this.delayedRequests.forEach((req) => {
        req.promise.then(() => {
          count--;
          if (count === 0) {
            setTimeout(() => { resolvePromise() }, 0)
          }
        })
        req.resolve(req.data);
      });
    })
  }
  /* istanbul ignore next */
  waitForComponentsToGetDataFromApi() {
    return new Promise((resolve, reject) => {
      this.waitForApiCallsFinish().then((data, error) => {
        if (error) {
          reject("api error");
        } else {
          setTimeout(() => {
            this.resolveDelayedRequest().then((data, error) => {
              if (error) {
                reject("error components getting data")
              } else {
                setTimeout(() => { resolve(true); }, 0)
              }
            })
          }, 0)
        }
      });
    })
  }

  //makes a simple http request passing of data if there is some
  /* istanbul ignore next */
  makeRequest(url, type, data, authRequest) {

    return new Promise((resolve, reject) => {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState === 4) {
          var data = JSON.parse(xmlhttp.responseText);
          resolve(data);
        }
      }
      xmlhttp.open(type, settings.apiLocation + url, true);
      if (authRequest) {
        xmlhttp.setRequestHeader("Authorization", "v1 " + auth.token);
      }
      if (data) {
        xmlhttp.setRequestHeader("content-type", "application/json; charset=utf-8")
        xmlhttp.send(data);
      } else {
        xmlhttp.send();
      }
    });
  }

  sendGet(url, authRequest) {
    return this.makeTrackedRequest(url, "GET", false, authRequest)
  }

  sendPost(url, data, authRequest) {
    return this.makeTrackedRequest(url, "POST", JSON.stringify(data), authRequest)
  }

  sendPut(url, data, authRequest) {
    return this.makeTrackedRequest(url, "PUT", JSON.stringify(data), authRequest)
  }

  sendDelete(url, authRequest) {
    return this.makeTrackedRequest(url, "DELETE", false, authRequest)
  }

}


export let request = new Request();