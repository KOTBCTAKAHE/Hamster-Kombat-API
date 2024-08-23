export default function handler(req, res) {
    const apps = {
        'BIKE': {
            'appToken': 'd28721be-fd2d-4b45-869e-9f253b554e50',
            'promoId': '43e35910-c168-4634-ad4f-52fd764a843f',
            'interval': 20,
            'eventCount': 13,
        },
        'CUBE': {
            'appToken': 'd1690a07-3780-4068-810f-9b5bbf2931b2',
            'promoId': 'b4170868-cef0-424f-8eb9-be0622e8e8e3',
            'interval': 20,
            'eventCount': 3,
        },
        'CLONE': {
            'appToken': '74ee0b5b-775e-4bee-974f-63e7f4d5bacb',
            'promoId': 'fe693b26-b342-4159-8808-15e3ff7f8767',
            'interval': 120,
            'eventCount': 5,
        },
        'TRAIN': {
            'appToken': '82647f43-3f87-402d-88dd-09a90025313f',
            'promoId': 'c4480ac7-e178-4973-8061-9ed5b2e17954',
            'interval': 120,
            'eventCount': 1,
        },
        'MERGEAWAY': {
            'appToken': '8d1cc2ad-e097-4b86-90ef-7a27e19fb833',
            'promoId': 'dc128d28-c45b-411c-98ff-ac7726fbaea4',
            'interval': 21,
            'eventCount': 7,
        },
        'TWERK': {
            'appToken': '61308365-9d16-4040-8bb0-2f4a4c69074c',
            'promoId': '61308365-9d16-4040-8bb0-2f4a4c69074c',
            'interval': 20,
            'eventCount': 10,
        },
        'POLY': {
            'appToken': '2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71',
            'promoId': '2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71',
            'interval': 30,
            'eventCount': 16,
        },
        'TRIM': {
            'appToken': 'ef319a80-949a-492e-8ee0-424fb5fc20a6',
            'promoId': 'ef319a80-949a-492e-8ee0-424fb5fc20a6',
            'interval': 31,
            'eventCount': 8,
        },
        'RACE': {
            'appToken': '8814a785-97fb-4177-9193-ca4180ff9da8',
            'promoId': '8814a785-97fb-4177-9193-ca4180ff9da8',
            'interval': 31,
            'eventCount': 7,
        }
    };

    const result = Object.keys(apps).map(key => {
        return {
            appName: key,
            appToken: apps[key].appToken,
            promoId: apps[key].promoId,
            interval: apps[key].interval,
            eventCount: apps[key].eventCount
        };
    });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(result, null, 2));
}
