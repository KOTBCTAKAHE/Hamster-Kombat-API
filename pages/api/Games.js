export default function handler(req, res) {
  // Массив объектов, каждый объект содержит promoId, appToken и minWaitAfterLogin
  const data = [
    { promoId: "c4480ac7-e178-4973-8061-9ed5b2e17954", appToken: "82647f43-3f87-402d-88dd-09a90025313f", minWaitAfterLogin: 121 },    // Name: BIKE
    { promoId: "fe693b26-b342-4159-8808-15e3ff7f8767", appToken: "74ee0b5b-775e-4bee-974f-63e7f4d5bacb", minWaitAfterLogin: 121 },    // Name: CLONE
    { promoId: "b4170868-cef0-424f-8eb9-be0622e8e8e3", appToken: "d1690a07-3780-4068-810f-9b5bbf2931b2", minWaitAfterLogin: 21 },     // Name: CUBE
    { promoId: "43e35910-c168-4634-ad4f-52fd764a843f", appToken: "d28721be-fd2d-4b45-869e-9f253b554e50", minWaitAfterLogin: 21 },     // Name: TRAIN
    { promoId: "dc128d28-c45b-411c-98ff-ac7726fbaea4", appToken: "8d1cc2ad-e097-4b86-90ef-7a27e19fb833", minWaitAfterLogin: 21 },     // Name: MERGEAWAY
    { promoId: "61308365-9d16-4040-8bb0-2f4a4c69074c", appToken: "61308365-9d16-4040-8bb0-2f4a4c69074c", minWaitAfterLogin: 21 },     // Name: TWERK
    { promoId: "2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71", appToken: "2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71", minWaitAfterLogin: 31 },     // Name: POLY
    { promoId: "8814a785-97fb-4177-9193-ca4180ff9da8", appToken: "8814a785-97fb-4177-9193-ca4180ff9da8", minWaitAfterLogin: 31 },     // Name: RACE
    { promoId: "ef319a80-949a-492e-8ee0-424fb5fc20a6", appToken: "ef319a80-949a-492e-8ee0-424fb5fc20a6", minWaitAfterLogin: 31 },     // Name: TRIM
    { promoId: "c0971b8-04df-4e72-8a3e-ec4dc663cd11", appToken: "c0971b8-04df-4e72-8a3e-ec4dc663cd11", minWaitAfterLogin: 31 }        // Name: CafeDash    New!
  ];

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(data);
}
