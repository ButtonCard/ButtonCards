// ----- PACKS -----
//Store Info About Pack Opened
let packSizes = [4,3,6];
let packCost = [1,1,2];

//Pack 1 Info
let Pack1_Name='Standard Pack';
let Pack1_Description='All Standard Cards Available<br>1/20 Chance for First Edition Variant!<br>1/30 Chance for BUTTON Meme Card!<br>4 Cards<br>1 Pack Token';
let Pack1_Image='icons/Pack_Icon.png';
let Pack1_Time=1774151999000; //2026
//Pack 2 Info
let Pack2_Name='First Edition Variant Pack';
let Pack2_Description='1/10 Chance for First Edition Variant!<br>For Sale: Until 3/24<br>EXPIRES TODAY!<br>3 Cards<br>1 Pack Tokens';
let Pack2_Image='icons/First_Icon.png';
let Pack2_Time=1742875199000; //3/23
//Pack 3 Info
let Pack3_Name='BUTTON Meme Pack';
let Pack3_Description='1/15 Chance for BUTTON Meme Card!<br>For Sale: Until 3/30<br><br>6 Cards<br>2 Pack Tokens';
let Pack3_Image='icons/Memes_Icon.png';
let Pack3_Time=1743393599000; //3/30
//Epoch Time Coverter 23:59:59 in milliseconds

//Unavailable Pack
//let Pack3_Name='Pack Not Available';
//let Pack3_Description='TBA<br>For Sale: Until N/A<br><br>N/A Cards<br>N/A Pack Token';
//let Pack3_Image='icons/Null_Icon.png';

// ----- CARDS -----

//All Cards Available Sorted by Rarity:
let C = ["01-1", "01-2", "02-1", "02-2", "02-3", "03-1", "03-2", "04-1", "04-2", "05-1", "05-2", "06-1", "06-2", "07-1", "07-2", "08-1", "08-2", "09-1", "09-2", "10-1", "10-2"];
let U = ["01-3", "01-4", "02-4", "02-5", "03-3", "03-4", "04-3", "04-4", "05-3", "05-4", "06-3", "06-4", "07-3", "07-4", "08-3", "08-4", "09-3", "09-4", "10-3", "10-4"];
let R = ["01-5", "01-6", "02-6", "03-5", "03-6", "04-5", "05-5", "06-5", "07-5", "08-5", "09-5", "10-5"];
let E = ["01-7", "01-8", "02-7", "03-7", "04-6", "05-6", "06-6", "07-6", "08-6", "09-6", "10-6"];
let L = ["01-9", "02-8", "03-8", "04-7", "05-7", "06-7", "07-7", "08-7", "09-7", "10-7"];
let V1 = ["V1-1", "V1-2", "V1-3", "V1-4", "V1-5", "V1-6", "V1-7", "V1-8"];
let S1 = ["S1-1", "S1-2", "S1-3", "S1-4", "S1-5", "S1-6", "S1-7", "S1-8"];

let VarSet = V1; //Pack 2 Variant
let SpeSet = S1; //Pack 3 Variant


//All Sets Current Available
let List01 = ["01-1", "01-2", "01-3", "01-4", "01-5", "01-6", "01-7", "01-8", "01-9", "01-A", "01-P"];
let List02 = ["02-1", "02-2", "02-3", "02-4", "02-5", "02-6", "02-7", "02-8", "02-A", "02-P"];
let List03 = ["03-1", "03-2", "03-3", "03-4", "03-5", "03-6", "03-7", "03-8", "03-A", "03-P"];
let List04 = ["04-1", "04-2", "04-3", "04-4", "04-5", "04-6", "04-7", "04-A", "04-P"];
let List05 = ["05-1", "05-2", "05-3", "05-4", "05-5", "05-6", "05-7", "05-A", "05-P"];
let List06 = ["06-1", "06-2", "06-3", "06-4", "06-5", "06-6", "06-7", "06-A", "06-P"];
let List07 = ["07-1", "07-2", "07-3", "07-4", "07-5", "07-6", "07-7", "07-A", "07-P"];
let List08 = ["08-1", "08-2", "08-3", "08-4", "08-5", "08-6", "08-7", "08-A", "08-P"];
let List09 = ["09-1", "09-2", "09-3", "09-4", "09-5", "09-6", "09-7", "09-A", "09-P"];
let List10 = ["10-1", "10-2", "10-3", "10-4", "10-5", "10-6", "10-7", "10-A", "10-P"];
let List11 = ["11-1", "11-A", "11-P"];
let ListV1 = ["V1-1", "V1-2", "V1-3", "V1-4", "V1-5", "V1-6", "V1-7", "V1-8", "V1-A"];
let ListV2 = ["V2-1", "V2-2", "V2-3", "V2-4", "V2-5", "V2-6", "V2-7", "V2-8", "V2-A"];
let ListS1 = ["S1-1", "S1-2", "S1-3", "S1-4", "S1-5", "S1-6", "S1-7", "S1-8", "S1-A"];
let allSets = [null, List01, List02, List03, List04, List05, List06, List07, List08, List09, List10, List11, ListV1, ListV2, ListS1];


//Counts of Each Card Rarity
let Lcount = 1;
let Ecount = 4;
let Rcount = 8;
let Ucount = 16;
let Vcount = 4;
let Scount = 2;

//Odds of Each Card Rarity (1/x per Card)
let Lrarity = 60;
let Erarity = 24;
let Rrarity = 12;
let Urarity = 4;
let Vrarity = 20;
let Srarity = 30;
let P2Vrarity = 10;
let P3Srarity = 15;
