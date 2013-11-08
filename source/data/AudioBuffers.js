/*=============================================================================
 _______  __   __  _______  _______  _______  ______    _______ 
|  _    ||  | |  ||       ||       ||       ||    _ |  |       |
| |_|   ||  | |  ||    ___||    ___||    ___||   | ||  |  _____|
|       ||  |_|  ||   |___ |   |___ |   |___ |   |_||_ | |_____ 
|  _   | |       ||    ___||    ___||    ___||    __  ||_____  |
| |_|   ||       ||   |    |   |    |   |___ |   |  | | _____| |
|_______||_______||___|    |___|    |_______||___|  |_||_______|

a mapping of names to buffers
=============================================================================*/

goog.provide("data.AudioBuffers");

/** 
	@typedef {Object}
*/
var AudioBuffers = {
	/*=========================================================================
		SYSTEM
	=========================================================================*/
	win : {
		url : "right.mp3",
		buffer : null
	},
	lose : {
		url : "wrong.mp3",
		buffer : null
	},
	songWon : {
		url : "SongWon.mp3",
		buffer : null
	},
	almost : {
		url : "Almost.mp3",
		buffer : null
	},
	notFastEnough : {
		url : "NotFastEnough.mp3",
		buffer : null
	},
	youRock : {
		url : "YouRock.mp3",
		buffer : null
	},
	/*=========================================================================
		COUNT IN
	=========================================================================*/
	countIn01 : {
		url : "CountIn01.mp3",
		buffer : null
	},
	countIn02 : {
		url : "CountIn02.mp3",
		buffer : null
	},
	countIn11 : {
		url : "CountIn11.mp3",
		buffer : null
	},
	countIn12 : {
		url : "CountIn12.mp3",
		buffer : null
	},
	countIn13 : {
		url : "CountIn13.mp3",
		buffer : null
	},
	countIn14 : {
		url : "CountIn14.mp3",
		buffer : null
	},
	countIn21 : {
		url : "CountIn11_fast.mp3",
		buffer : null
	},
	countIn22 : {
		url : "CountIn12_fast.mp3",
		buffer : null
	},
	countIn23 : {
		url : "CountIn13_fast.mp3",
		buffer : null
	},
	countIn24 : {
		url : "CountIn14_fast.mp3",
		buffer : null
	},
	/*=========================================================================
		808
	=========================================================================*/
	cow808 : {	
		url : "cow808.mp3",
		buffer : null 
	},
	kick808 : {	
		url : "kick808.mp3",
		buffer : null 
	},
	snare808 : {
		url : "snare808.mp3",
		buffer : null 
	},
	hh808 : {
		url : "hh808.mp3",
		buffer : null
	},
	/*=========================================================================
		NO SURPRISES
	=========================================================================*/
	nosur_A : {
		url : "nosur_A.mp3",
		buffer : null
	},
	nosur_F : {
		url : "nosur_F.mp3",
		buffer : null
	},
	nosur_C : {
		url : "nosur_C.mp3",
		buffer : null
	},
	nosur_Bb : {
		url : "nosur_Bb.mp3",
		buffer : null
	},
	nosur_Db : {
		url : "nosur_Db.mp3",
		buffer : null
	},
	nosur_G : {
		url : "nosur_G.mp3",
		buffer : null
	},
	nosur_BassF : {
		url : "nosur_BassF.mp3",
		buffer : null
	},
	nosur_BassBb : {
		url : "nosur_BassBb.mp3",
		buffer : null
	},
	/*=========================================================================
		EVERY BREATH YOU TAKE
	=========================================================================*/
	EveryBreath_GuitarA0 : {
		url : "EveryBreath/guitarA0.mp3",
		buffer : null
	},
	EveryBreath_GuitarA1 : {
		url : "EveryBreath/guitarA1.mp3",
		buffer : null
	},
	EveryBreath_GuitarB0 : {
		url : "EveryBreath/guitarB0.mp3",
		buffer : null
	},
	EveryBreath_GuitarB1 : {
		url : "EveryBreath/guitarB1.mp3",
		buffer : null
	},
	EveryBreath_GuitarC0 : {
		url : "EveryBreath/guitarC0.mp3",
		buffer : null
	},
	EveryBreath_GuitarC1 : {
		url : "EveryBreath/guitarC1.mp3",
		buffer : null
	},
	EveryBreath_GuitarD0 : {
		url : "EveryBreath/guitarD0.mp3",
		buffer : null
	},
	EveryBreath_GuitarD1 : {
		url : "EveryBreath/guitarD1.mp3",
		buffer : null
	},
	EveryBreath_BassA : {
		url : "EveryBreath/bassA.mp3",
		buffer : null
	},
	EveryBreath_BassB : {
		url : "EveryBreath/bassB.mp3",
		buffer : null
	},
	EveryBreath_BassC : {
		url : "EveryBreath/bassC.mp3",
		buffer : null
	},
	EveryBreath_BassD : {
		url : "EveryBreath/bassD.mp3",
		buffer : null
	},
	EveryBreath_Kick : {
		url : "EveryBreath/kick.mp3",
		buffer : null
	},
	EveryBreath_Snare : {
		url : "EveryBreath/snare.mp3",
		buffer : null
	},
	EveryBreath_End : {
		url : "EveryBreath/end.mp3",
		buffer : null
	},
	/*=========================================================================
		GET LUCKY
	=========================================================================*/
	GetLucky_Guitar0 : {
		url : "GetLucky/guitar0.mp3",
		buffer : null
	},
	GetLucky_Guitar1 : {
		url : "GetLucky/guitar1.mp3",
		buffer : null
	},
	GetLucky_Bass0 : {
		url : "GetLucky/bass0.mp3",
		buffer : null
	},
	GetLucky_Bass1 : {
		url : "GetLucky/bass1.mp3",
		buffer : null
	},
	GetLucky_Kick : {
		url : "GetLucky/kick.mp3",
		buffer : null
	},
	GetLucky_Snare : {
		url : "GetLucky/snare.mp3",
		buffer : null
	},
	GetLucky_Hats : {
		url : "GetLucky/hats.mp3",
		buffer : null
	},
	GetLucky_Lead0 : {
		url : "GetLucky/lead0.mp3",
		buffer : null
	},
	GetLucky_Lead1 : {
		url : "GetLucky/lead1.mp3",
		buffer : null
	},
	GetLucky_Lead2 : {
		url : "GetLucky/lead2.mp3",
		buffer : null
	},
	GetLucky_Chords : {
		url : "GetLucky/chords.mp3",
		buffer : null
	}
};
