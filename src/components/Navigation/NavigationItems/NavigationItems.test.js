import React from 'react'
import { configure, shallow } from 'enzyme' //enzyme is used to mock rendering a component standalone without having to render the entire tree of component.
import Adapter from 'enzyme-adapter-react-16' // to connect enzyme with react

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({ adapter: new Adapter() }); // with this enzyme is connected 

describe('<NavigationItems />', () => {
    let wrapper;  // wrapper means the component you want to simulate and test.
    beforeEach( () => { //this function will get executed before each test 
        wrapper = shallow(<NavigationItems />);
    }) 

    // test() or it() describes individual test
    it('should render 2 <NavigationItem /> if not authenticated', () => {
        // const wrapper = shallow(<NavigationItems />);
        // now lets write our tests 
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render 3 <NavigationItem /> if authenticated', () => {
        // const wrapper = shallow(<NavigationItems isAuth/>);
        // wrapper = shallow(<NavigationItems isAuth/>);
        wrapper.setProps({isAuth: true})
        // now lets write our tests         
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render an exact logout button if authenticated', () => {   
        wrapper.setProps({isAuth: true})             
        expect(wrapper.contains(<NavigationItem link="/logout" >Logout</NavigationItem>)).toEqual(true);
    });
})