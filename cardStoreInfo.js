// ----- PACKS -----
//Store Info About Pack Opened
let packSizes = [4,3,6];
let packCost = [1,1,2];

//Pack 1 Info
let Pack1_Name='Standard Pack';
let Pack1_Description='All Standard Cards Available<br>1/25 Chance for Space Variant!<br>1/45 Chance for Star Wars Movie Card!<br>4 Cards<br>1 Pack Token';
let Pack1_Image='icons/Pack_Icon.png';

//Pack 2 Info
let Pack2_Name='Space Variant Pack';
let Pack2_Description='1/6 Chance for Space Variant!<br>For Sale: Until 5/10<br><br>3 Cards<br>1 Pack Token';
let Pack2_Image='icons/Space_Icon.png';

//Pack 3 Info
let Pack3_Name='Star Wars Movies Pack';
let Pack3_Description='1/16 Chance for Star Wars Movie Card!<br>For Sale: Until 5/12<br><br>6 Cards<br>2 Pack Tokens';
let Pack3_Image='icons/Star_Icon.png';

//Unavailable Pack
//let Pack3_Name='Pack Not Available';
//let Pack3_Description='TBA<br>For Sale: Until N/A<br><br>N/A Cards<br>N/A Pack Token';
//let Pack3_Image='icons/Null_Icon.png';
//Epoch Time Coverter 23:59:59 in milliseconds
let Pack1_Time=1774151999000; //2026
let Pack2_Time=1774151999000; //2026
let Pack3_Time=1774151999000; //2026

// ----- CARDS -----

//All Cards Available Sorted by Rarity:
let C = ["01-0", "01-1", "02-1", "02-2", "02-3", "03-1", "03-2", "04-1", "04-2", "05-1", "05-2", "06-1", "06-2", "07-1", "07-2", "08-1", "08-2", "09-1", "09-2", "10-1", "10-2", "11-1", "11-2", "11-3", "12-1", "12-2", "13-1", "13-2", "13-3", "14-1", "14-2", "15-1", "15-2", "16-1", "16-2", "17-1", "17-2", "18-1", "18-2", "19-1", "19-2", "20-1", "20-2", "20-3", "21-1", "21-2", "22-1", "22-2", "23-1", "23-2", "24-1", "24-2", "25-1", "25-2", "26-1", "26-2"];
let U = ["01-2", "01-3", "02-4", "02-5", "03-3", "03-4", "04-3", "04-4", "05-3", "05-4", "06-3", "06-4", "07-3", "07-4", "08-3", "08-4", "09-3", "09-4", "10-3", "10-4", "11-4", "11-5", "12-3", "12-4", "12-5", "13-4", "13-5", "14-3", "14-4", "15-3", "15-4", "15-5", "16-3", "16-4", "17-3", "17-4", "18-3", "18-4", "19-3", "19-4", "20-4", "20-5", "21-3", "21-4", "22-3", "22-4", "23-3", "23-4", "24-3", "24-4", "25-3", "25-4", "25-5", "26-3", "26-4"];
let R = ["01-4", "01-5", "02-6", "03-5", "03-6", "04-5", "05-5", "06-5", "07-5", "08-5", "09-5", "10-5", "11-6", "12-6", "13-6", "14-5", "14-6", "15-6", "16-5", "17-5", "18-5", "19-5", "19-6", "20-6", "21-5", "22-5", "23-5", "24-5", "25-6", "26-5"];
let E = ["01-6", "01-7", "01-8", "02-7", "03-7", "04-6", "05-6", "06-6", "07-6", "08-6", "09-6", "10-6", "11-7", "12-7", "13-7", "14-7", "15-7", "16-6", "17-6", "18-6", "19-7", "20-7", "21-6", "22-6", "23-6", "24-6", "25-7", "26-6"];
let L = ["01-9", "02-8", "03-8", "04-7", "05-7", "06-7", "07-7", "08-7", "09-7", "10-7", "11-8", "12-8", "13-8", "14-8", "15-8", "16-7", "17-7", "18-7", "19-8", "20-8", "21-7", "22-7", "23-7", "24-7", "25-8", "26-7"];
let V1 = ["V1-1", "V1-2", "V1-3", "V1-4", "V1-5", "V1-6", "V1-7", "V1-8"];
let V2 = ["V2-1", "V2-2", "V2-3", "V2-4", "V2-5", "V2-6", "V2-7", "V2-8"];
let V3 = ["V3-1", "V3-2", "V3-3", "V3-4", "V3-5", "V3-6", "V3-7", "V3-8"];
let V4 = ["V4-1", "V4-2", "V4-3", "V4-4", "V4-5", "V4-6", "V4-7", "V4-8"];
let V5 = ["V5-1", "V5-2", "V5-3", "V5-4", "V5-5", "V5-6", "V5-7", "V5-8"];
let V6 = ["V6-1", "V6-2", "V6-3", "V6-4", "V6-5", "V6-6", "V6-7", "V6-8"];
let V7 = ["V7-1", "V7-2", "V7-3", "V7-4", "V7-5", "V7-6", "V7-7", "V7-8"];
let V8 = ["V8-1", "V8-2", "V8-3", "V8-4", "V8-5", "V8-6", "V8-7", "V8-8"];
let V10 = ["V10-1", "V10-2", "V10-3", "V10-4", "V10-5", "V10-6", "V10-7", "V10-8"];
let B1 = ["B1-1", "B1-2", "B1-3", "B1-4", "B1-5", "B1-6"];
let B2 = ["B2-1", "B2-2", "B2-3", "B2-4", "B2-5", "B2-6"];
let S1 = ["S1-1", "S1-2", "S1-3", "S1-4", "S1-5", "S1-6", "S1-7", "S1-8"];
let S2 = ["S2-1", "S2-2", "S2-3", "S2-4", "S2-5", "S2-6", "S2-7", "S2-8"];
let S3 = ["S3-1", "S3-2", "S3-3", "S3-4", "S3-5", "S3-6", "S3-7", "S3-8"];
let S4 = ["S4-1", "S4-2", "S4-3", "S4-4", "S4-5", "S4-6", "S4-7", "S4-8"];
let S5 = ["S5-1", "S5-2", "S5-3", "S5-4", "S5-5", "S5-6", "S5-7", "S5-8"];
let S6 = ["S6-1", "S6-2", "S6-3", "S6-4", "S6-5", "S6-6", "S6-7", "S6-8"];
let S7 = ["S7-1", "S7-2", "S7-3", "S7-4", "S7-5", "S7-6", "S7-7", "S7-8"];
let S8 = ["S8-1", "S8-2", "S8-3", "S8-4", "S8-5", "S8-6"];
let S10 = ["S10-1", "S10-2", "S10-3", "S10-4", "S10-5", "S10-6", "S10-7", "S10-8"];

let VarSet = V10; //Pack 2 Variant
let SpeSet = S10; //Pack 3 Variant


//All Sets Current Available
let List01 = ["01-0", "01-1", "01-2", "01-3", "01-4", "01-5", "01-6", "01-7", "01-8", "01-9", "01-A", "01-P"];
let List02 = ["02-1", "02-2", "02-3", "02-4", "02-5", "02-6", "02-7", "02-8", "02-A", "02-P"];
let List03 = ["03-1", "03-2", "03-3", "03-4", "03-5", "03-6", "03-7", "03-8", "03-A", "03-P"];
let List04 = ["04-1", "04-2", "04-3", "04-4", "04-5", "04-6", "04-7", "04-A", "04-P"];
let List05 = ["05-1", "05-2", "05-3", "05-4", "05-5", "05-6", "05-7", "05-A", "05-P"];
let List06 = ["06-1", "06-2", "06-3", "06-4", "06-5", "06-6", "06-7", "06-A", "06-P"];
let List07 = ["07-1", "07-2", "07-3", "07-4", "07-5", "07-6", "07-7", "07-A", "07-P"];
let List08 = ["08-1", "08-2", "08-3", "08-4", "08-5", "08-6", "08-7", "08-A", "08-P"];
let List09 = ["09-1", "09-2", "09-3", "09-4", "09-5", "09-6", "09-7", "09-A", "09-P"];
let List10 = ["10-1", "10-2", "10-3", "10-4", "10-5", "10-6", "10-7", "10-A", "10-P"];
let List11 = ["11-1", "11-2", "11-3", "11-4", "11-5", "11-6", "11-7", "11-8", "11-A", "11-P"];
let List12 = ["12-1", "12-2", "12-3", "12-4", "12-5", "12-6", "12-7", "12-8", "12-A", "12-P"];
let List13 = ["13-1", "13-2", "13-3", "13-4", "13-5", "13-6", "13-7", "13-8", "13-A", "13-P"];
let List14 = ["14-1", "14-2", "14-3", "14-4", "14-5", "14-6", "14-7", "14-8", "14-A", "14-P"];
let List15 = ["15-1", "15-2", "15-3", "15-4", "15-5", "15-6", "15-7", "15-8", "15-A", "15-P"];
let List16 = ["16-1", "16-2", "16-3", "16-4", "16-5", "16-6", "16-7", "16-A", "16-P"];
let List17 = ["17-1", "17-2", "17-3", "17-4", "17-5", "17-6", "17-7", "17-A", "17-P"];
let List18 = ["18-1", "18-2", "18-3", "18-4", "18-5", "18-6", "18-7", "18-A", "18-P"];
let List19 = ["19-1", "19-2", "19-3", "19-4", "19-5", "19-6", "19-7", "19-8", "19-A", "19-P"];
let List20 = ["20-1", "20-2", "20-3", "20-4", "20-5", "20-6", "20-7", "20-8", "20-A", "20-P"];
let List21 = ["21-1", "21-2", "21-3", "21-4", "21-5", "21-6", "21-7", "21-A", "21-P"];
let List22 = ["22-1", "22-2", "22-3", "22-4", "22-5", "22-6", "22-7", "22-A", "22-P"];
let List23 = ["23-1", "23-2", "23-3", "23-4", "23-5", "23-6", "23-7", "23-A", "23-P"];
let List24 = ["24-1", "24-2", "24-3", "24-4", "24-5", "24-6", "24-7", "24-A", "24-P"];
let List25 = ["25-1", "25-2", "25-3", "25-4", "25-5", "25-6", "25-7", "25-8", "25-A", "25-P"];
let List26 = ["26-1", "26-2", "26-3", "26-4", "26-5", "26-6", "26-7", "26-A", "26-P"];

let ListV1 = ["V1-1", "V1-2", "V1-3", "V1-4", "V1-5", "V1-6", "V1-7", "V1-8", "V1-A"];
let ListV2 = ["V2-1", "V2-2", "V2-3", "V2-4", "V2-5", "V2-6", "V2-7", "V2-8", "V2-A"];
let ListV3 = ["V3-1", "V3-2", "V3-3", "V3-4", "V3-5", "V3-6", "V3-7", "V3-8", "V3-A"];
let ListV4 = ["V4-1", "V4-2", "V4-3", "V4-4", "V4-5", "V4-6", "V4-7", "V4-8", "V4-A"];
let ListV5 = ["V5-1", "V5-2", "V5-3", "V5-4", "V5-5", "V5-6", "V5-7", "V5-8", "V5-A"];
let ListV6 = ["V6-1", "V6-2", "V6-3", "V6-4", "V6-5", "V6-6", "V6-7", "V6-8", "V6-A"];
let ListV7 = ["V7-1", "V7-2", "V7-3", "V7-4", "V7-5", "V7-6", "V7-7", "V7-8", "V7-A"];
let ListV8 = ["V8-1", "V8-2", "V8-3", "V8-4", "V8-5", "V8-6", "V8-7", "V8-8", "V8-A"];
let ListV9 = ["V9-1", "V9-2", "V9-3", "V9-4", "V9-5", "V9-6", "V9-7"];
let ListV10 = ["V10-1", "V10-2", "V10-3", "V10-4", "V10-5", "V10-6", "V10-7", "V10-8", "V10-A"];

let ListB1 = ["B1-1", "B1-2", "B1-3", "B1-4", "B1-5", "B1-6", "B1-A"];
let ListB2 = ["B2-1", "B2-2", "B2-3", "B2-4", "B2-5", "B2-6", "B2-A"];

let ListS1 = ["S1-1", "S1-2", "S1-3", "S1-4", "S1-5", "S1-6", "S1-7", "S1-8", "S1-A"];
let ListS2 = ["S2-1", "S2-2", "S2-3", "S2-4", "S2-5", "S2-6", "S2-7", "S2-8", "S2-A"];
let ListS3 = ["S3-1", "S3-2", "S3-3", "S3-4", "S3-5", "S3-6", "S3-7", "S3-8", "S3-A"];
let ListS4 = ["S4-1", "S4-2", "S4-3", "S4-4", "S4-5", "S4-6", "S4-7", "S4-8", "S4-A"];
let ListS5 = ["S5-1", "S5-2", "S5-3", "S5-4", "S5-5", "S5-6", "S5-7", "S5-8", "S5-A"];
let ListS6 = ["S6-1", "S6-2", "S6-3", "S6-4", "S6-5", "S6-6", "S6-7", "S6-8", "S6-A"];
let ListS7 = ["S7-1", "S7-2", "S7-3", "S7-4", "S7-5", "S7-6", "S7-7", "S7-8", "S7-A"];
let ListS8 = ["S8-1", "S8-2", "S8-3", "S8-4", "S8-5", "S8-6", "S8-A"];
let ListS9 = ["S9-1", "S9-2", "S9-3", "S9-4", "S9-5"];
let ListS10 = ["S10-1", "S10-2", "S10-3", "S10-4", "S10-5", "S10-6", "S10-7", "S10-8", "S10-A"];

let allSets = [null, List01, List02, List03, List04, List05, List06, List07, List08, List09, List10, List11, List12, List13, List14, List15, List16, List17, List18, List19, List20, List21, List22, List23, List24, List25, List26, ListV1, ListV2, ListV3, ListV4, ListV5, ListV6, ListV7, ListV8, ListV9, ListV10, ListB1, ListB2, ListS1, ListS2, ListS3, ListS4, ListS5, ListS6, ListS7, ListS8, ListS9, ListS10];
let awardSets = [List01, List02, List03, List04, List05, List06, List07, List08, List09, List10, List11, List12, List13, List14, List15, List16, List17, List18, List19, List20, List21, List22, List23, List24, List25, List26, ListB1, ListB2, ListV10, ListS10];
let missionSets = [C, U, R, E, V10];

//Counts of Each Card Rarity
let Lcount = 1;
let Ecount = 4;
let Rcount = 8;
let Ucount = 16;
let Vcount = 4;
let Scount = 2;

//Odds of Each Card Rarity (1/x per Card)
let Lrarity = 45;
let Erarity = 40;
let Rrarity = 12;
let Urarity = 4;
let Vrarity = 25;
let Srarity = 45;
let P2Vrarity = 8;
let P3Srarity = 16;


/*Retired Packs:
First Edition 3/22-3/24
let Pack2_Name='First Edition Variant Pack';
let Pack2_Description='1/10 Chance for First Edition Variant!<br>For Sale: Until 3/24<br><br>3 Cards<br>1 Pack Tokens';
let Pack2_Image='icons/First_Icon.png';

Maryland 3/25-3/28
let Pack2_Name='Maryland Variant Pack';
let Pack2_Description='1/10 Chance for Maryland Variant!<br>For Sale: Until 3/28<br><br>7 Cards<br>2 Pack Tokens';
let Pack2_Image='icons/MD_Icon.png';

BUTTON Memes 3/22-3/28
let Pack3_Name='BUTTON Meme Pack';
let Pack3_Description='1/15 Chance for BUTTON Meme Card!<br>For Sale: Until 3/29<br><br>6 Cards<br>2 Pack Tokens';
let Pack3_Image='icons/Memes_Icon.png';

Make It Meme 3/29-4/1
let Pack3_Name='Make It Meme Pack';
let Pack3_Description='1/15 Chance for Make It Meme Card!<br>For Sale: Until 4/1<br><br>6 Cards<br>2 Pack Tokens';
let Pack3_Image='icons/Make_Icon.png';

3 Years of Button 3 4/2, 4/11
let Pack3_Name='3 Years of Button 3 Pack';
let Pack3_Description='1/12 Chance for Button 3 Anniversary Card!<br>For Sale: Until 4/2<br><br>3 Cards<br>1 Pack Tokens';
let Pack3_Image='icons/Btn3_Icon.png';

Backroom 3/29-4/3
let Pack2_Name='Backrooms Variant Pack';
let Pack2_Description='1/10 Chance for Backrooms Variant!<br>For Sale: Until 4/3<br><br>3 Cards<br>1 Pack Token';
let Pack2_Image='icons/Back_Icon.png';

BUTTON Media 4/2-4/10
let Pack3_Name='BUTTON Media Pack';
let Pack3_Description='1/16 Chance for BUTTON Media Card!<br>For Sale: Until 4/10<br><br>5 Cards<br>2 Pack Tokens';
let Pack3_Image='icons/Media_Icon.png';

Minecraft 4/4-4/11
let Pack2_Name='Minecraft Variant Pack';
let Pack2_Description='1/12 Chance for Minecraft Variant!<br>For Sale: Until 4/11<br><br>3 Cards<br>1 Pack Token';
let Pack2_Image='icons/Mine_Icon.png';

Hacker 4/12-4/15
let Pack2_Name='Hacker Variant Pack';
let Pack2_Description='1/12 Chance for Hacker Variant!<br>For Sale: Until 4/15<br><br>3 Cards<br>1 Pack Token';
let Pack2_Image='icons/Hack_Icon.png';

BUTTON Photos 4/11-4/20
let Pack3_Name='BUTTON Photos Pack';
let Pack3_Description='1/16 Chance for BUTTON Photos Card!<br>For Sale: Until 4/20<br><br>5 Cards<br>2 Pack Tokens';
let Pack3_Image='icons/Photo_Icon.png';

Banana 4/16-4/21
let Pack2_Name='Banana Variant Pack';
let Pack2_Description='1/8 Chance for Banana Variant!<br>For Sale: Until 4/21<br><br>4 Cards<br>2 Pack Tokens';
let Pack2_Image='icons/Bana_Icon.png';

End 4/22-4/26
let Pack2_Name='End Variant Pack';
let Pack2_Description='1/8 Chance for End Variant!<br>For Sale: Until 4/26<br><b>EXPIRES TOMORROW!</b><br>3 Cards<br>1 Pack Token';
let Pack2_Image='icons/End_Icon.png';

Missing 4/21-4/26
let Pack3_Name='Missing Pack';
let Pack3_Description='1/16 Chance for Missing Card!<br>For Sale: Until 4/26<br><b>EXPIRES TOMORROW!</b><br>6 Cards<br>2 Pack Tokens';
let Pack3_Image='icons/Miss_Icon.png';

ButtonCraft 5th 4/27-5/3
let Pack1_Name='ButtonCraft 5th Anniversary Pack';
let Pack1_Description='All Standard Cards Available<br>1/5 Chance for 5 Years of Button Card!<br>1/20 Chance for Diamond Variant!<br>1/40 Chance for Postcard Card!<br>For Sale: Until 5/3<br>4 Cards<br>1 Pack Token';
let Pack1_Image='icons/Fifth_Icon.png';

Diamond 4/27-5/3
let Pack2_Name='Diamond Variant Pack';
let Pack2_Description='1/6 Chance for Diamond Variant!<br>For Sale: Until 5/3<br><br>3 Cards<br>1 Pack Token';
let Pack2_Image='icons/Diam_Icon.png';

Postcard 4/27-5/3
let Pack3_Name='Postcard Pack';
let Pack3_Description='1/16 Chance for Postcard Card!<br>For Sale: Until 5/3<br><br>6 Cards<br>2 Pack Tokens';
let Pack3_Image='icons/Post_Icon.png';

*/
