export default class HelperGenerator {
    constructor(data) {
        this.data = data
    }
    getData() {
        let array = []
        for (let item of this.data) {
            if(item) {
                let obj = {
                    id: item.id,
                    author: item.author,
                    quote: this.getRandom(item.text),
                    text: item.text
                }
                array.push(obj)

            }
        }
        return array
    }
    getRandom(array) {
        const randomIndex = Math.floor(Math.random() * array.length);
        const randomObject = array[randomIndex];
        return randomObject
        
    }
}