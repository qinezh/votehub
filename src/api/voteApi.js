export default class VoteApi {
    static topics = [];

    static addCountAsync(topicId, userId, userIdSign) {
        if (!topicId || !userId || !userIdSign) {
            throw new Error("topicId/userId/userIdSign can't be undefined/null.");
        }

        return fetch("/api/topic", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "topicId": topicId,
                "userId": userId,
                "userIdSign": userIdSign
            })
        }).then(res => res.status);
    }

    static async getAllTopicsAsync() {
        return fetch("/api/topics").then(res => res.json());
    }

    static async getTopicByIdAsync(id) {
        if (!id) {
            throw new Error("id can't be undefined/null while calling getTopicByIdAsync");
        }

        return fetch(`/api/topic/${id}`).then(res => res.json());
    }

    static async createTopicAsync(owner, idSign, title, description) {
        return fetch(`/api/topic/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "owner": owner,
              "idSign": idSign,
              "title": title,
              "description": description,
              "count": 0
            })
        }).then(res => res.status);
    }
}