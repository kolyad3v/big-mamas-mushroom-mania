import Experience from '../../Experience'
import axios from 'axios'
import ItemInfo from './itemInfo'

export default class ItemAdd {
	constructor(itemName) {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.item = this.resources.items[itemName]
		this.mushroomName = itemName

		this.randomX = (Math.random() - 0.5) * 500
		this.randomZ = (Math.random() - 0.5) * 500
		this.addItem()

		this.collected = false

		this.info = new ItemInfo()

		this.config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
	}

	addItem() {
		this.mushroom = this.item.scene
		console.log(this.mushroom)
		this.mushroom.scale.x = 5
		this.mushroom.scale.y = 5
		this.mushroom.scale.z = 5

		this.mushroom.position.x = this.randomX
		this.mushroom.position.z = this.randomZ

		this.scene.add(this.mushroom)
	}

	awardPlayer = async () => {
		if (!this.collected) {
			this.collected = true
			try {
				this.res = await axios.post(
					'/api/items',
					this.info[this.mushroomName],
					this.config
				)
				console.log(this.res.data)
			} catch (err) {
				console.log(err)
			}
		} else if (this.collected) {
			this.mushroom && this.scene.remove(this.mushroom)
		}
	}
}
