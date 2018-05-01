import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import HomeTest from '../components/testComponents/tryJestTest';


configure({ adapter: new Adapter() });

describe('Testing test component', () => {
    it('includes 1 div with class foo', () => {
        const wrapper = shallow(<HomeTest />)
        const text = wrapper.find('span').text()
        expect(text).toEqual('test!')
    });
})