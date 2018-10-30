import { BurgerBuilder } from '../BurgerBuilder/BurgerBuilder'; //note that BurgerBuilder is a stateful component and is connected to Redux. We have exported it from its file so that we can render it without depending on Redux, and initialise it by just passing props using setProps method from enzyme package.
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import React from 'react'
import { configure, shallow } from 'enzyme' //enzyme is used to mock rendering a component standalone without having to render the entire tree of component.
import Adapter from 'enzyme-adapter-react-16' // to connect enzyme with react


configure({ adapter: new Adapter() }); // with this enzyme is connected 

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => { }} />);
    });

    it('Should render <BuildControls /> if has ingredients', () => {
        wrapper.setProps({ ingrs: { salad: 0 } });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
})



