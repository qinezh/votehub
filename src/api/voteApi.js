export default class VoteApi {
    static features = [{
        "id": "0",
        "title": "docfx watch: serve rebuild file changes",
        "count": 20
    },
    {
        "id": "1",
        "title": "More attractive themes",
        "count": 8
    },
    {
        "id": "2",
        "title": "Website auto-build and host documents",
        "count": 5
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