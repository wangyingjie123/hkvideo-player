/* eslint-disable */
import Box from '../box'
import Stream from '../stream'

Box.mp4a = function () {
    let stream = new Stream(this.data)
    stream.skip(6)
    this.dataReferenceIndex = stream.readUint16()
    stream.skip(8)
    this.channelCount = stream.readUint16()
    this.sampleSize = stream.readUint16()
    stream.skip(4)
    this.sampleRate = stream.readUint32() >> 16
    let box = new Box()
    box.readHeader(stream)
    this.subBox.push(box)
    box.readBody(stream)
    delete this.data
    stream = null
}
