/* eslint-disable */
import Box from '../box'
import Stream from '../stream'

Box.stts = function () {
    let stream = new Stream(this.data)
    this.version = stream.readUint8()
    this.flag = Stream.readByte(stream.dataview, 3)
    this.count = stream.readUint32()
    let entry = []
    for (let i = 0, count = this.count; i < count; i++) {
        entry.push({
            sampleCount: stream.readUint32(),
            sampleDuration: stream.readUint32()
        })
    }
    this.entry = entry
    delete this.subBox
    delete this.data
    stream = null
}
