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
		505
	=========================================================================*/
	drums505 : {
		snare : "505/snare.mp3",
		kick : "505/kick.mp3",
		hh : "505/hh.mp3",
		hho : "505/hho.mp3",
	},
	/*=========================================================================
		linn
	=========================================================================*/
	linnDrum : {
		snare : "linn/snare.mp3",
		kick : "linn/kick.mp3",
		clap : "linn/clap.mp3",
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
		CASIO PIANO
	=========================================================================*/
	casioPiano : {
		D0 : "casio/piano/D0.mp3",
		G0 : "casio/piano/G0.mp3",
		Gsharp1 : "casio/piano/Gs1.mp3",
		A1 : "casio/piano/A1.mp3",
		Asharp1 : "casio/piano/As1.mp3",
		B1 : "casio/piano/B1.mp3",
		C2 : "casio/piano/C2.mp3",
		Csharp2 : "casio/piano/Cs2.mp3",
		D2 : "casio/piano/D2.mp3",
		Dsharp2 : "casio/piano/Ds2.mp3",
		E2 : "casio/piano/E2.mp3",
		F2 : "casio/piano/F2.mp3",
		Fsharp2 : "casio/piano/Fs2.mp3",
		G2 : "casio/piano/G2.mp3",
		A2 : "casio/piano/A2.mp3",
	},
	/*=========================================================================
		CASIO VIBES
	=========================================================================*/
	casioVibes : {
		B2 : "casio/vibes/B2.mp3",
		Csharp3 : "casio/vibes/Cs3.mp3",
		Fsharp3 : "casio/vibes/Fs3.mp3",
		G3 : "casio/vibes/G3.mp3",
		Gsharp3 : "casio/vibes/Gs3.mp3",
		A3 : "casio/vibes/A3.mp3",
		Asharp3 : "casio/vibes/As3.mp3",
	},
	/*=========================================================================
		CASIO FLUTE
	=========================================================================*/
	casioFlute : {
		A1 : "casio/flute/A1.mp3",
		B1 : "casio/flute/B1.mp3",
		Csharp2 : "casio/flute/Cs2.mp3",
		E2 : "casio/flute/E2.mp3",
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
		CASIO HORN
	=========================================================================*/
	casioHorn : {
		E2 : "casio/horn/E2.mp3",
		G2 : "casio/horn/G2.mp3",
		A2 : "casio/horn/A2.mp3",
		C3 : "casio/horn/C3.mp3",
	},
	/*=========================================================================
		CASIO COSMIC
	=========================================================================*/
	casioCosmic : {
		C0 : "casio/cosmic/C0.mp3",
		E0 : "casio/cosmic/E0.mp3",
		G0 : "casio/cosmic/G0.mp3",
		A0 : "casio/cosmic/A0.mp3",
		Asharp0 : "casio/cosmic/As0.mp3",
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
		CASIO TRUMPET
	=========================================================================*/
	casioTrumpet : {
		Asharp1 : "casio/trumpet/As1.mp3",
		D2 : "casio/trumpet/D2.mp3",
		Asharp2 : "casio/trumpet/As2.mp3",
		D3 : "casio/trumpet/D3.mp3",
	},
	/*=========================================================================
		CASIO HARPSICHORD
	=========================================================================*/
	casioHarpsichord : {
		C1 : "casio/harpsichord/C1.mp3",
		E1 : "casio/harpsichord/E1.mp3",
		A1 : "casio/harpsichord/A1.mp3",
		Asharp1 : "casio/harpsichord/As1.mp3",
		C2 : "casio/harpsichord/C2.mp3",
		E2 : "casio/harpsichord/E2.mp3",
		A2 : "casio/harpsichord/A2.mp3",
		Asharp2 : "casio/harpsichord/As2.mp3",
		E3 : "casio/harpsichord/E3.mp3",
		G3 : "casio/harpsichord/G3.mp3",
		A3 : "casio/harpsichord/A3.mp3",
		Asharp3 : "casio/harpsichord/As3.mp3",
		C4 : "casio/harpsichord/C4.mp3",
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
		clav6 : "volca/clavHigh3.mp3",
		sweepDown0 : "volca/sweepDown0.mp3",
		sweepDown1 : "volca/sweepDown1.mp3",
		sweepUp : "volca/sweepUp.mp3"
	},
	/*=========================================================================
		OPERATOR SLOW ATTACK
	=========================================================================*/
	operatorSlow : {
		Fsharp1 : "operator/slow/Fs1.mp3"
	},
	/*=========================================================================
		CS80 Brassy
	=========================================================================*/
	cs80Brassy : {
		E1 : "cs80/brassy/E1.mp3",
		G1 : "cs80/brassy/G1.mp3",
		A1 : "cs80/brassy/A1.mp3",
		B1 : "cs80/brassy/B1.mp3",
		C2 : "cs80/brassy/C2.mp3",
		Dsharp2 : "cs80/brassy/Ds2.mp3"
	},
	/*=========================================================================
		CS80 Mellow
	=========================================================================*/
	cs80Mellow : {
		Asharp1 : "cs80/mellow/As1.mp3",
		Csharp2 : "cs80/mellow/Cs2.mp3",
		Dsharp2 : "cs80/mellow/Ds2.mp3",
		Asharp2 : "cs80/mellow/As2.mp3",
	}
};
