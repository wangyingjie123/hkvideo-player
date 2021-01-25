/* eslint-disable */
import Player from '@baidu/haokan-player';
import {
    version
} from '../package.json';

class _Errors extends Player.Errors {
    constructor(type, vid, errd = {}, url = '') {
        errd.version = version;
        super(type, vid, errd);
        this.url = url;
    }
}

export default _Errors;
