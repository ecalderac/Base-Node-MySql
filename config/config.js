//==================
//PORT
//==================
process.env.PORT = process.env.PORT || 3999;

//==================
//SEED
//==================
process.env.SEED = process.env.SEED || 'ClavE.Secreta-Automotora-%$#"%&/(%&#$##"()gfdfsdf$$';

//==================
//TOKEN EXPIRATION
//==================
process.env.TOKEN_EXPIRATION = 1000 * 60 * 60 * 1; //300.000(ms)=>300(s)=>5(min)  | //1000 * 60 * 60 * 24; =>equivale 24hrs.