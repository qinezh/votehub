export default class VoteApi {
    static features = [{
        "title": "Support to xxx",
        "count": 16
    },
    {
        "title": "Improve xxx",
        "count": 10
    },
    {
        "title": "Support to xxxx",
        "count": 16
    },
    {
        "title": "Improve xxxx",
        "count": 10
    },
    {
        "title": "Support to xxxxx",
        "count": 16
    },
    {
        "title": "Improve xxxxx",
        "count": 10
    }]

    static addCount(title) {
        for (let feature of this.features) {
            if (feature.title === title) {
                feature.count += 1;
                return true;
            }
        }

        return false;
    }

    static getAll() {
        this.features.sort((f0, f1) => {
            return f0.count < f1.count;
        });
        return this.features;
    }
}