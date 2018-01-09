import "mocha-steps";
import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { browserHistory, getCurrentLocation } from "react-router"
import { Route, Switch, BrowserRouter, MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
//import {shallow} from 'enzyme';

import { auth } from './../../helpers/Auth';
import { request } from './../../helpers/Request';
import Register from './Register'




describe("should test Register ", function () {


    let register;



    step("Auth is false", function () {
        auth.logout();
        expect(auth.isAuth()).to.equal(false);
    });


    step("Mount Register component", () => {
        register = mount(<Register code="aaa" done={() => { }} />);
    })

    step("is loading", () => {
        register.update();
        expect(register.find('.loaderContainer').exists()).to.equal(true)
    });

    step("resolve request ", () => {
        return request.waitForComponentsToGetDataFromApi();
    });



    step("guild found loading stopped", () => {
        register.update();
        expect(register.find('.loaderContainer').exists()).to.equal(false)
        expect(register.find('.guild').exists()).to.equal(true);
    });

    step("phone not set", () => {
        expect(register.find('.charName').exists()).to.equal(false)
        expect(register.state().charName).to.equal(undefined)
    });

    step("char not set", () => {
        expect(register.find('.phoneNum').exists()).to.equal(false)
        expect(register.state().phone).to.equal(undefined)
    });

    step("input wrong char name", () => {
        const event = { target: { name: "pollName", value: 'ral' } };
        let input = register.find('input');
        input.simulate('change', event);
        register.find('.btn').simulate('click');
    });



    step("is loading", () => {
        expect(register.find('.loaderContainer').exists()).to.equal(true)
    });

    step("give data to component", () => {
        return request.waitForComponentsToGetDataFromApi();
    });


    step("loading stopped", () => {
        register.update();
        expect(register.find('.loaderContainer').exists()).to.equal(false)
    })

    step("error shown", () => {
        expect(register.find('.error').exists()).to.equal(true)
    })


    let enterRightCharacter = () => {
        step("input right char", () => {
            register.update();
            const event = { target: { name: "pollName", value: 'siljko' } };
            let input = register.find('input');
            input.simulate('change', event);
            expect(register.find('.error').exists()).to.equal(false)
            register.find('.btn').simulate('click');
        });


        step("give data to component", () => {
            return request.waitForComponentsToGetDataFromApi();
        });

        step("char updated", () => {
            register.update();
            expect(register.find('.charName').exists()).to.equal(true)
            expect(register.state().charName).to.equal('Siljko')
        })
    }

    enterRightCharacter();


    step("enter wrong phone number", () => {
        let wrongNumber = "+111"
        let event = { target: { name: "pollName", value: wrongNumber } };
        let input = register.find('input');
        input.simulate('change', event);
    });

    step("click send sms", () => {
        let btn = register.find('button');
        btn.simulate('click', {});
    });



    step("is loading", () => {
        register.update();
        let loader = register.find('.loaderContainer');
        expect(loader.exists()).to.equal(true);
    });

    step("give data to component", () => {
        return request.waitForComponentsToGetDataFromApi();
    });

    step("stopped loading", () => {
        register.update();
        let loader = register.find('.loaderContainer');
        expect(register.state().loading).to.equal(false);
        expect(loader.exists()).to.equal(false);
    });



    step("error shown wrong mobile phone", () => {
        let err = register.find('.error');
        expect(err.exists()).to.equal(true);
    })

    let enterRightPhoneNumber = () => {

        step("enter existing phone number", () => {
            register.update();
            let num = "+385989411056"
            const event = { target: { name: "pollName", value: num } };
            let input = register.find('input');
            input.simulate('change', event);
        });

        step("error removed", () => {
            register.update();
            let err = register.find('.error');
            expect(err.exists()).to.equal(false);
        })

        step("send true phone", () => {
            let btn = register.find('button');
            btn.simulate('click', {});
        })

        step("give data to component", () => {
            return request.waitForComponentsToGetDataFromApi();
        });

        step("is on step 3", () => {
            register.update();
            let step3 = register.find('.phoneNum');
            // expect(step3.exists()).to.equal(true);
            expect(register.state().accessToken).to.not.equal(false);
        })
    }

    enterRightPhoneNumber();

    step("enter wrong mobile code", () => {
        let num = '111';
        const event = { target: { name: "pollName", value: num } };
        let input = register.find('input');
        input.simulate('change', event);
    })


    step("send request check for loading", () => {
        let num = '111';
        let input = register.find('.btn2');
        input.simulate('click');
        let loader = register.find('.loaderContainer');
        expect(loader.exists()).to.equal(true);
    })

    step("give data to component", () => {
        return request.waitForComponentsToGetDataFromApi();
    });


    step("error shown wrong mobile code", () => {
        register.update();
        expect(register.find('.error').exists()).to.equal(true);
    })

    step("change back to charName input", () => {
        register.find('.charName').simulate('click', {});
        expect(register.state().step).to.equal('char');
    })

    enterRightCharacter();

    step("change back to phone input", () => {
        register.find('.phone').simulate('click', {});
        expect(register.state().step).to.equal('phone');
    })

    enterRightPhoneNumber();

    step("resend mobile code", () => {
        register.find('#resendCode').simulate('click', {})
    })

    step("loader shown", () => {
        let loader = register.find('.loaderContainer');
        expect(loader.exists()).to.equal(true);
    })


    step("give data to component", () => {
        return request.waitForComponentsToGetDataFromApi();
    });

    step("loader hidden, value reset", () => {
        register.update();
        let loader = register.find('.loaderContainer');
        expect(loader.exists()).to.equal(false);
        let input = register.find('input');
        expect(input.props().value).to.equal('');
    })

    step("check error removed", () => {
        let num = '123456';
        const event = { target: { name: "pollName", value: num } };
        let input = register.find('input');
        input.simulate('change', event);
        expect(register.find('.error').exists()).to.equal(false);
    })

    step("send request check for loading", () => {
        let input = register.find('.btn2');
        input.simulate('click');
        let loader = register.find('.loaderContainer');
        expect(loader.exists()).to.equal(true);
    })

    step("give data to component", () => {
        return request.waitForComponentsToGetDataFromApi();
    });

    step("user is now authenticated", () => {
        expect(auth.isAuth()).to.equal(true);
    });


});