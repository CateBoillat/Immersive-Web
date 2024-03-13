import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { MeshBasicMaterial, Vector3, Mesh } from 'three'

export default class Type {
    constructor(props) {
        this.font = props.fontFile
        this.size = props.size || 0.5
        this.height = props.height || 0.2
        this.curveSegments = props.curveSegments || 12
        this.bevelEnabled = props.bevelEnabled || true
        this.bevelSize = props.bevelSize || 0.03
        this.bevelOffset = props.bevelOffset || 0
        this.bevelSegments = props.bevelSegments || 5
        this.bevelThickness = props.bevelThickness || 0.03
        this.material = props.material
            ? props.material
            : new MeshBasicMaterial({ color: 'white' })
        this.meshes = props.meshes
        this.scene = props.scene
        this.fontLoader = new FontLoader()
        this.position = props.position || new Vector3(0, 0, 0)
        this.text = props.text
        this.name = props.name
    }

    init() {
        this.fontLoader.load(this.font, (font) => {
            const textGeometry = new TextGeometry(this.text, {
                font: font,
                size: this.size,
                height: this.height,
                curveSegments: this.curveSegments,
                bevelEnabled: this.bevelEnabled,
                bevelThickness: this.bevelThickness,
                bevelSize: this.bevelSize,
                bevelOffset: this.bevelOffset,
                bevelSegments: this.bevelSegments,
            })
            const text = new Mesh(textGeometry, this.material)
            text.position.set(this.position.x, this.position.y, this.position.z)
            this.meshes[`${this.name}`] = text
            this.scene.add(this.meshes[`${this.name}`])
        })
    }
}