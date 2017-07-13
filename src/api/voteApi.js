export default class VoteApi {
    static features = [{
        "id": "0",
        "title": "Support to xxx",
        "count": 16
    },
    {
        "id": "1",        
        "title": "Improve xxx",
        "count": 10
    },
    {
        "id": "2",        
        "title": "Support to xxxx",
        "count": 16
    },
    {
        "id": "3",        
        "title": "Improve xxxx",
        "count": 10
    },
    {
        "id": "4",        
        "title": "Support to xxxxx",
        "count": 16
    },
    {
        "id": "5",        
        "title": "Improve xxxxx",
        "count": 10
    }]

    static addCount(id) {
        for (let feature of this.features) {
            if (feature.id === id) {
                feature.count += 1;
                return true;
            }
        }

        return false;
    }

    static getAllItems() {
        this.features.sort((f0, f1) => {
            return f0.count < f1.count;
        });
        return this.features;
    }

    static getItemById(id) {
        for (let feature of this.features) {
            if (feature.id === id) {
                return feature;
            }
        }
        return null;
    }
}