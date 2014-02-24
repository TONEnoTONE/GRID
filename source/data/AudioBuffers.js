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
		agogoHigh : "505/agogoHigh.mp3",
		agogoLow : "505/agogoLow.mp3",
	},
	/*=========================================================================
		linn
	=========================================================================*/
	linnDrum : {
		snare : "linn/snare.mp3",
		kick : "linn/kick.mp3",
		clap : "linn/clap.mp3",
		tamb : "linn/tamb.mp3",
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
		C3 : "casio/vibes/C3.mp3",
		Csharp3 : "casio/vibes/Cs3.mp3",
		Dsharp3 : "casio/vibes/Ds3.mp3",
		Fsharp3 : "casio/vibes/Fs3.mp3",
		G3 : "casio/vibes/G3.mp3",
		Gsharp3 : "casio/vibes/Gs3.mp3",
		A3 : "casio/vibes/A3.mp3",
		Asharp3 : "casio/vibes/As3.mp3",
		B3 : "casio/vibes/B3.mp3",
		C4 : "casio/vibes/C4.mp3",
		D4 : "casio/vibes/D4.mp3",
		E4 : "casio/vibes/E4.mp3",
	},
	/*=========================================================================
		CASIO FLUTE
	=========================================================================*/
	casioFlute : {
		A1 : "casio/flute/A1.mp3",
		B1 : "casio/flute/B1.mp3",
		Csharp2 : "casio/flute/Cs2.mp3",
		E2 : "casio/flute/E2.mp3",
		Fsharp2 : "casio/flute/Fs2.mp3",
		Gsharp2 : "casio/flute/Gs2.mp3",
	},
	/*=========================================================================
		CASIO FUNNY
	=========================================================================*/
	casioFunny : {
		G01 : "casio/funny/G01.mp3",
		C0 : "casio/funny/C0.mp3",
		D0 : "casio/funny/D0.mp3",
		A0 : "casio/funny/A0.mp3",
		B0 : "casio/funny/B0.mp3",
		G0 : "casio/funny/G0.mp3",
		C1 : "casio/funny/C1.mp3",
		B1 : "casio/funny/B1.mp3",
		C2 : "casio/funny/C2.mp3",
		D2 : "casio/funny/D2.mp3",
		E2 : "casio/funny/E2.mp3",
		F2 : "casio/funny/F2.mp3"
	},
	/*=========================================================================
		CASIO CLARINET
	=========================================================================*/
	casioClarinet : {
		D2 : "casio/clarinet/D2.mp3",
		E2 : "casio/clarinet/E2.mp3",
		G2 : "casio/clarinet/G2.mp3",
		E3 : "casio/clarinet/E3.mp3",
		F3 : "casio/clarinet/F3.mp3",
		G3 : "casio/clarinet/G3.mp3",
		A3 : "casio/clarinet/A3.mp3",
		B3 : "casio/clarinet/B3.mp3",
		C4 : "casio/clarinet/C4.mp3",
	},
	/*=========================================================================
		CASIO HORN
	=========================================================================*/
	casioHorn : {
		C2 : "casio/horn/C2.mp3",
		Csharp2 : "casio/horn/Cs2.mp3",
		D2 : "casio/horn/D2.mp3",
		Dsharp2 : "casio/horn/Ds2.mp3",
		E2 : "casio/horn/E2.mp3",
		F2 : "casio/horn/F2.mp3",
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
		C2 : "casio/cosmic/C2.mp3",
		D2 : "casio/cosmic/D2.mp3",
		Dsharp2 : "casio/cosmic/Ds2.mp3",
		E2 : "casio/cosmic/E2.mp3",
		F2 : "casio/cosmic/F2.mp3",
		Gsharp2 : "casio/cosmic/Gs2.mp3",
		G2 : "casio/cosmic/G2.mp3",
		Asharp2 : "casio/cosmic/As2.mp3",
		C3 : "casio/cosmic/C3.mp3",
		D3 : "casio/cosmic/D3.mp3",
		Dsharp3 : "casio/cosmic/Ds3.mp3",
		G3 : "casio/cosmic/G3.mp3",
		C4 : "casio/cosmic/C4.mp3",
	},
	/*=========================================================================
		CASIO TRUMPET
	=========================================================================*/
	casioTrumpet : {
		Asharp1 : "casio/trumpet/As1.mp3",
		C2 : "casio/trumpet/C2.mp3",
		D2 : "casio/trumpet/D2.mp3",
		E2 : "casio/trumpet/E2.mp3",
		G2 : "casio/trumpet/G2.mp3",
		Asharp2 : "casio/trumpet/As2.mp3",
		C3 : "casio/trumpet/C3.mp3",
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
		G2 : "casio/harpsichord/G2.mp3",
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
		clapDr110 : "volca/DR110Clap.mp3",
		clav0 : "volca/clavLow0.mp3",
		clav1 : "volca/clavLow1.mp3",
		clav2 : "volca/clavLow2.mp3",
		clav3 : "volca/clavHigh0.mp3",
		clav4 : "volca/clavHigh1.mp3",
		clav5 : "volca/clavHigh2.mp3",
		clav6 : "volca/clavHigh3.mp3",
		sweepDown0 : "volca/sweepDown0.mp3",
		sweepDown1 : "volca/sweepDown1.mp3",
		sweepUp : "volca/sweepUp.mp3",
		highTom : "volca/highTom.mp3",
		lowTom : "volca/lowTom.mp3",
	},
	dr110 : {
		clap : "dr110/clap.mp3",
		hh : "dr110/hh.mp3",
		hho : "dr110/hho.mp3",
		kick : "dr110/kick.mp3",
		cymbal : "dr110/cymbal.mp3",
	},
	/*=========================================================================
		OPERATOR SLOW ATTACK
	=========================================================================*/
	operatorSlow : {
		Fsharp1 : "operator/slow/Fs1.mp3",
		Csharp2 : "operator/slow/Cs2.mp3",
		Dsharp2 : "operator/slow/Ds2.mp3",
		F2 : "operator/slow/F2.mp3",
		Fsharp2 : "operator/slow/Fs2.mp3",
	},
	/*=========================================================================
		OPERATOR GUITAR
	=========================================================================*/
	operatorGuitar : {
		D2 : "operator/guitar/D2.mp3",
		Dsharp2 : "operator/guitar/Ds2.mp3",
		Gsharp2 : "operator/guitar/Gs2.mp3",
		Asharp2 : "operator/guitar/As2.mp3",
		B2 : "operator/guitar/B2.mp3",
		Csharp3 : "operator/guitar/Cs3.mp3",
		D3 : "operator/guitar/D3.mp3",
		F3 : "operator/guitar/F3.mp3",
		Fsharp3 : "operator/guitar/Fs3.mp3",
		Gsharp3 : "operator/guitar/Gs3.mp3",
		G3 : "operator/guitar/G3.mp3",
		D4 : "operator/guitar/D4.mp3",
	},
	/*=========================================================================
		OPERATOR GUITAR
	=========================================================================*/
	operatorBass : {
		Asharp0 : "operator/bass/As0.mp3",
		Csharp1 : "operator/bass/Cs1.mp3",
		D1 : "operator/bass/D1.mp3",
		Dsharp1 : "operator/bass/Ds1.mp3",
	},
	/*=========================================================================
		OPERATOR BRASS
	=========================================================================*/
	operatorBrass : {
		Gsharp2 : "operator/brass/Gs2.mp3",
		Asharp2 : "operator/brass/As2.mp3",
		C3 : "operator/brass/C3.mp3",
		F3 : "operator/brass/F3.mp3",
		G3 : "operator/brass/G3.mp3",
		Gsharp3 : "operator/brass/Gs3.mp3",
		Asharp3 : "operator/brass/As3.mp3",
		C4 : "operator/brass/C4.mp3",
	},
	/*=========================================================================
		CS80 Brassy
	=========================================================================*/
	cs80Brassy : {
		E1 : "cs80/brassy/E1.mp3",
		F1 : "cs80/brassy/F1.mp3",
		G1 : "cs80/brassy/G1.mp3",
		Gsharp1 : "cs80/brassy/Gs1.mp3",
		A1 : "cs80/brassy/A1.mp3",
		Asharp1 : "cs80/brassy/As1.mp3",
		B1 : "cs80/brassy/B1.mp3",
		C2 : "cs80/brassy/C2.mp3",
		D2 : "cs80/brassy/D2.mp3",
		Dsharp2 : "cs80/brassy/Ds2.mp3"
	},
	/*=========================================================================
		CS80 Mellow
	=========================================================================*/
	cs80Mellow : {
		G1 : "cs80/mellow/G1.mp3",
		Gsharp1 : "cs80/mellow/Gs1.mp3",
		A1 : "cs80/mellow/A1.mp3",
		Asharp1 : "cs80/mellow/As1.mp3",
		C2 : "cs80/mellow/C2.mp3",
		Csharp2 : "cs80/mellow/Cs2.mp3",
		Dsharp2 : "cs80/mellow/Ds2.mp3",
		E2 : "cs80/mellow/E2.mp3",
		F2 : "cs80/mellow/F2.mp3",
		Gsharp2 : "cs80/mellow/Gs2.mp3",
		A2 : "cs80/mellow/A2.mp3",
		Asharp2 : "cs80/mellow/As2.mp3",
	},
	/*=========================================================================
		Korg Electric
	=========================================================================*/
	korgElectric : {
		A3 : "VS1/electric/A3.mp3",
		C4 : "VS1/electric/C4.mp3",
		E4 : "VS1/electric/E4.mp3",
		F4 : "VS1/electric/F4.mp3",
		G4 : "VS1/electric/G4.mp3",
		Gsharp4 : "VS1/electric/Gs4.mp3",
		Asharp4 : "VS1/electric/As4.mp3",
		C5 : "VS1/electric/C5.mp3",
		D5 : "VS1/electric/D5.mp3",
		Dsharp5 : "VS1/electric/Ds5.mp3",
		Gsharp5 : "VS1/electric/Gs5.mp3",
	},
	/*=========================================================================
		Korg Piano
	=========================================================================*/
	korgPiano : {
		C2 : "VS1/piano/C2.mp3",
		F2 : "VS1/piano/F2.mp3",
		B2 : "VS1/piano/B2.mp3",
		C3 : "VS1/piano/C3.mp3",
		D3 : "VS1/piano/D3.mp3",
		E3 : "VS1/piano/E3.mp3",
		F3 : "VS1/piano/F3.mp3",
		G3 : "VS1/piano/G3.mp3",
		C4 : "VS1/piano/C4.mp3",
		D4 : "VS1/piano/D4.mp3",
		E4 : "VS1/piano/E4.mp3",
		F4 : "VS1/piano/F4.mp3",
		G4 : "VS1/piano/G4.mp3",
		A4 : "VS1/piano/A4.mp3",
		Asharp4 : "VS1/piano/As4.mp3",
		C5 : "VS1/piano/C5.mp3",
		D5 : "VS1/piano/D5.mp3",
		Dsharp5 : "VS1/piano/Ds5.mp3",
		G5 : "VS1/piano/G5.mp3",
	},
	/*=========================================================================
		CD Bass
	=========================================================================*/
	cdBass : {
		A0 : "CD/bass/A0.mp3",
		E1 : "CD/bass/E1.mp3",
	},
	/*=========================================================================
		CD Acoustic Guitar
	=========================================================================*/
	cdAcoustic : {
		E2 : "CD/acoustic/E2.mp3",
		E3 : "CD/acoustic/E3.mp3",
		Csharp3 : "CD/acoustic/Cs3.mp3",
	},
	/*=========================================================================
		CD Electric Guitar
	=========================================================================*/
	cdElectric : {
		E2 : "CD/electric/E2.mp3",
		Fsharp3 : "CD/electric/Fs3.mp3",
		Gsharp3 : "CD/electric/Gs3.mp3",
	},
	/*=========================================================================
		CD FX
	=========================================================================*/
	cdFX : {
		kick : "CD/fx/kick.mp3",
		kickShort : "CD/fx/kickShort.mp3",
		snare : "CD/fx/snare.mp3",
		beep0 : "CD/fx/beep0.mp3",
		beep1 : "CD/fx/beep1.mp3",
		beep2 : "CD/fx/beep2.mp3",
		click0 : "CD/fx/click0.mp3",
		click1 : "CD/fx/click1.mp3",
	},
	/*=========================================================================
		LOOP BASS
	=========================================================================*/
	loopBass : {
		C0 : "loop/bass/C0.mp3",
		A0 : "loop/bass/A0.mp3",
		C1 : "loop/bass/C1.mp3",
		A1 : "loop/bass/A1.mp3",
	},
	/*=========================================================================
		LOOP MID
	=========================================================================*/
	loopMid : {
		B3 : "loop/mid/B3.mp3",
		C4 : "loop/mid/C4.mp3",
		D4 : "loop/mid/D4.mp3",
		E4 : "loop/mid/E4.mp3",
		G4 : "loop/mid/G4.mp3",
		B4 : "loop/mid/B4.mp3",
	},
	/*=========================================================================
		LOOP HIGH
	=========================================================================*/
	loopHigh : {
		E0 : "loop/high/E0.mp3",
		G0 : "loop/high/G0.mp3",
		B0 : "loop/high/B0.mp3",
		C1 : "loop/high/C1.mp3",
		E1 : "loop/high/E1.mp3",
		G1 : "loop/high/G1.mp3",
		B1 : "loop/high/B1.mp3",
		C2 : "loop/high/C2.mp3",
		E2 : "loop/high/E2.mp3",
		G2 : "loop/high/G2.mp3",
		B2 : "loop/high/B2.mp3",
		C3 : "loop/high/C3.mp3",
	},
};
