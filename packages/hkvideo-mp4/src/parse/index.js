/* eslint-disable */
import Box from './box';
import Concat from 'concat-typed-array';
import Stream from './stream';
import './box/MP4DecConfigDescrTag';
import './box/MP4DecSpecificDescrTag';
import './box/MP4ESDescrTag';
import './box/SLConfigDescriptor';
import './box/avc1';
import './box/avcC';
import './box/btrt';
import './box/co64';
import './box/ctts';
import './box/dref';
import './box/elst';
import './box/esds';
import './box/ftyp';
import './box/hdlr';
import './box/iods';
import './box/mdat';
import './box/mdhd';
import './box/mp4a';
import './box/mvhd';
import './box/pasp';
import './box/smhd';
import './box/stco';
import './box/stsc';
import './box/stsd';
import './box/stss';
import './box/stsz';
import './box/stts';
import './box/tkhd';
import './box/url';
import './box/vmhd';
class Parse {
    constructor(buffer) {
        this.buffer = null
        this.boxes = []
        this.nextBox = null
        this.start = 0
        let self = this
        if (self.buffer) {
            Concat(Uint8Array, self.buffer, buffer)
        } else {
            self.buffer = buffer
        }
        let bufferLength = buffer.byteLength
        buffer.position = 0
        let stream = new Stream(buffer)
        while (bufferLength - stream.position >= 8) {
            let box = new Box()
            box.readHeader(stream)
            if (box.size - 8 <= (bufferLength - stream.position)) {
                box.readBody(stream)
                self.boxes.push(box)
            } else {
                if (box.type === 'mdat') {
                    box.readBody(stream)
                    self.boxes.push(box)
                } else {
                    self.nextBox = box
                    stream.position -= 8
                    break
                }
            }
        }
        self.buffer = new Uint8Array(self.buffer.slice(stream.position))
    }
}

export default Parse
