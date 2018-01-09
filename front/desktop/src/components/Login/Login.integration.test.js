import "mocha-steps";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
//import {shallow} from 'enzyme';

import { auth } from './../../helpers/Auth';
import { request } from './../../helpers/Request';
import Login from './Login'




describe("should test login ", function () {


    let login;
    let registeredPhoneNumber = "+0989411056"
    
    step("Auth is false", function () {
        auth.logout();
        expect(auth.isAuth()).to.equal(false);
    });

    step("Mount Login component", () => {
        login = mount(<Login auth={auth} />);
    })

    step("enter wrong phone number", () => {
        let wrongNumber = "+111"
        let event = { target: { name: "pollName", value: wrongNumber } };
        let input = login.find('input');
        input.simulate('change', event);
    });

    step("click send sms", () => {
        let btn = login.find('button');
        btn.simulate('click', {});
        expect(login.state().loading).to.equal(true);
    });



    step("is loading", () => {
        login.update();
        let loader = login.find('.loaderContainer');
        expect(loader.exists()).to.equal(true);
    });

    step("resolve request ", () => {
        return request.waitForApiCallsFinish();
    });


    step("give data to component", () => {
        return request.resolveDelayedRequest();
    });

    step("stopped loading", () => {
        login.update();
        let loader = login.find('.loaderContainer');
        expect(login.state().loading).to.equal(false);
        expect(loader.exists()).to.equal(false);
    });



    step("error shown no user", () => {
        let err = login.find('.error');
        expect(err.exists()).to.equal(true);
    })

    step("enter existing phone number", () => {
        let num = "+385989411056"
        const event = { target: { name: "pollName", value: num } };
        let input = login.find('input');
        input.simulate('change', event);
    });

    step("error removed", () => {
        login.update();
        let err = login.find('.error');
        expect(err.exists()).to.equal(false);
    })

    step("send true phone", () => {
        let btn = login.find('button');
        btn.simulate('click', {});
        expect(login.state().loading).to.equal(true);
    })

    step("resolve request ", () => {
        return request.waitForApiCallsFinish();
    });


    step("give data to component", () => {
        return request.resolveDelayedRequest();
    });

    step("is on step 2", () => {
        login.update();
        let step2 = login.find('.step2');
        expect(step2.exists()).to.equal(true);
        expect(login.state().accessToken).to.not.equal(false);
    })

    step("enter wrong mobile code", () => {
        let num = '111';
        const event = { target: { name: "pollName", value: num } };
        let input = login.find('input');
        input.simulate('change', event);
    })


    step("send request check for loading", () => {
        let num = '111';
        let input = login.find('.btn2');
        input.simulate('click');
        let loader = login.find('.loaderContainer');
        expect(loader.exists()).to.equal(true);
    })

    step("resolve request ", () => {
        return request.waitForApiCallsFinish();
    });


    step("give data to component", () => {
        return request.resolveDelayedRequest();
    });


    step("error shown wrong mobile code", () => {
        login.update();
        expect(login.state().errorMobileToken).to.equal(true);
        expect(login.find('.error').exists()).to.equal(true);
    })

    step("resend mobile code", () => {
        login.find('#resendCode').simulate('click', {})
    })

    step("loader shown", () => {
        let loader = login.find('.loaderContainer');
        expect(loader.exists()).to.equal(true);
    })

    step("resolve request ", () => {
        return request.waitForApiCallsFinish();
    });


    step("give data to component", () => {
        return request.resolveDelayedRequest();
    });

    step("loader hidden, value reset", () => {
        login.update();
        let loader = login.find('.loaderContainer');
        expect(loader.exists()).to.equal(false);
        let input = login.find('input');
        expect(input.props().value).to.equal('');
    })

    step("check error removed", () => {
        let num = '123456';
        const event = { target: { name: "pollName", value: num } };
        let input = login.find('input');
        input.simulate('change', event);
        expect(login.find('.error').exists()).to.equal(false);
    })

    step("send request check for loading", () => {
        let input = login.find('.btn2');
        input.simulate('click');
        let loader = login.find('.loaderContainer');
        expect(loader.exists()).to.equal(true);
    })

    step("resolve request ", () => {
        'adsadsa';
        return request.waitForApiCallsFinish();
    });


    step("give data to component", () => {
        return request.resolveDelayedRequest();
    });

    step("user is now authenticated", () => {
        expect(auth.isAuth()).to.equal(true);
    });

});