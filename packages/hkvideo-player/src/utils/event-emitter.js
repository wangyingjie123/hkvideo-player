/* eslint-disable */

/**
 *  @file event-emitter--IE开发中使用
 *  @params player 对象实例
 *  @returns void
 */
const EventEmitter = (player) => {
    let all = Object.create(null);
    let other = Object.create(null);
    player.on = (type, handler) => {
        (all[type] || (all[type] = [])).push(handler);
    }
    player.off = (type, handler) => {
        if (all[type]) {
            all[type].splice(all[type].indexOf(handler) >>> 0, 1);
        }
        if (other[type]) {
            other[type].splice(other[type].indexOf(handler) >>> 0, 1);
        }
    }
    player.emit = (type, evt) => {
        if (other[type]) {
            (other[type] || []).slice().map((handler) => { 
                handler.apply(player, evt); 
                other[type].splice(other[type].indexOf(handler) >>> 0, 1);
            });
            (other['*'] || []).slice().map((handler) => {
                handler.apply(player, type, evt);
                other[type].splice(other[type].indexOf(handler) >>> 0, 1);
            });
        }
        if (all[type]) {
            (all[type] || []).slice().map((handler) => { handler.call(player, evt); });
            (all['*'] || []).slice().map((handler) => { handler.call(player, type, evt); });
        }
    }
    player.once = (type, handler) => {
        (other[type] || (other[type] = [])).push(handler);
    }
}
export default EventEmitter;