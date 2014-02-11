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
		808!
	=========================================================================*/
	drums808 : {
		cow : "808/cow808.mp3",
		kick : "808/kick808.mp3",
		snare : "808/snare808.mp3",
		hh : "808/hh808.mp3",
		hho : "808/hho808.mp3",
		tomHi : "808/tomHi808.mp3",
		tomLow : "808/tomLow808.mp3",
	},
	/*=========================================================================
		KEYS
	=========================================================================*/
	keys : {
		A :  "keys/A_keys.mp3",
		Asharp : "keys/As_keys.mp3",
		B : "keys/B_keys.mp3",
		C : "keys/C_keys.mp3",
		Csharp : "keys/Cs_keys.mp3",
		D : "keys/D_keys.mp3",
		Dsharp : "keys/Ds_keys.mp3",
		E :  "keys/E_keys.mp3",
		F : "keys/F_keys.mp3",
		Fsharp : "keys/Fs_keys.mp3",
		G : "keys/G_keys.mp3",
		Gsharp : "keys/Gs_keys.mp3",
	},
	/*=========================================================================
		BASS
	=========================================================================*/
	bass : {
		A : "bass/A_bass.mp3",
		Asharp : "bass/As_bass.mp3",
		B : "bass/B_bass.mp3",
		C : "bass/C_bass.mp3",
		Csharp : "bass/Cs_bass.mp3",
		D : "bass/D_bass.mp3",
		Dsharp : "bass/Ds_bass.mp3",
		E : "bass/E_bass.mp3",
		F : "bass/F_bass.mp3",
		Fsharp : "bass/Fs_bass.mp3",
		G : "bass/G_bass.mp3",
		Gsharp : "bass/Gs_bass.mp3",
	},
	/*=========================================================================
		LEAD
	=========================================================================*/
	lead : {
		A : "lead/A_lead.mp3",
		Asharp : "lead/As_lead.mp3",
		B : "lead/B_lead.mp3",
		C : "lead/C_lead.mp3",
		Csharp : "lead/Cs_lead.mp3",
		D : "lead/D_lead.mp3",
		Dsharp : "lead/Ds_lead.mp3",
		E : "lead/E_lead.mp3",
		F : "lead/F_lead.mp3",
		Fsharp : "lead/Fs_lead.mp3",
		G : "lead/G_lead.mp3",
		Gsharp : "lead/Gs_lead.mp3",
	},
	/*=========================================================================
		CASIO PIANO
	=========================================================================*/
	casioPiano : {
		D0 : "casio/piano/D0.mp3",
		G0 : "casio/piano/G0.mp3",
		A1 : "casio/piano/A1.mp3",
		B1 : "casio/piano/B1.mp3",
		Csharp2 : "casio/piano/Cs2.mp3",
		D2 : "casio/piano/D2.mp3",
		Fsharp2 : "casio/piano/Fs2.mp3",
	},
	/*=========================================================================
		CASIO VIBES
	=========================================================================*/
	casioVibes : {
		B2 : "casio/vibes/B2.mp3",
		Csharp3 : "casio/vibes/Cs3.mp3",
		Fsharp3 : "casio/vibes/Fs3.mp3",
		G3 : "casio/vibes/G3.mp3",
		A3 : "casio/vibes/A3.mp3",
	},
	/*=========================================================================
		CASIO FUNNY
	=========================================================================*/
	casioFunny : {
		C1 : "casio/funny/C1.mp3",
		B0 : "casio/funny/B0.mp3",
		A0 : "casio/funny/A0.mp3",
		G0 : "casio/funny/G0.mp3"
	},
	/*=========================================================================
		CASIO CLARINET
	=========================================================================*/
	casioClarinet : {
		D2 : "casio/clarinet/D2.mp3",
		E2 : "casio/clarinet/E2.mp3",
		G2 : "casio/clarinet/G2.mp3",
	},
	/*=========================================================================
		CASIO COSMIC
	=========================================================================*/
	casioCosmic : {
		D2 : "casio/cosmic/D2.mp3",
		Dsharp2 : "casio/cosmic/Ds2.mp3",
		E2 : "casio/cosmic/E2.mp3",
		G2 : "casio/cosmic/G2.mp3",
		C3 : "casio/cosmic/C3.mp3",
		Dsharp3 : "casio/cosmic/Ds3.mp3",
		G3 : "casio/cosmic/G3.mp3",
		C4 : "casio/cosmic/C4.mp3",
	},
	/*=========================================================================
		VOLCA
	=========================================================================*/
	volca : {
		kick : "volca/kick.mp3",
		hh : "volca/hh.mp3",
		clap : "volca/clap.mp3",
		clav0 : "volca/clavLow0.mp3",
		clav1 : "volca/clavLow1.mp3",
		clav2 : "volca/clavLow2.mp3",
		clav3 : "volca/clavHigh0.mp3",
		clav4 : "volca/clavHigh1.mp3",
		clav5 : "volca/clavHigh2.mp3",
		clav6 : "volca/clavHigh3.mp3"
	},
	/*=========================================================================
		OPERATOR SLOW ATTACK
	=========================================================================*/
	operatorSlow : {
		Fsharp1 : "operator/slow/Fs1.mp3"
	},
	/*=========================================================================
		CS80
	=========================================================================*/
	cs80Brassy : {
		A1 : "cs80/brassy/A1.mp3",
		C2 : "cs80/brassy/C2.mp3",
		Dsharp2 : "cs80/brassy/Ds2.mp3"
	}
};
