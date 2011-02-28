var devCheck = 1;

function dev() {
	document.textpad.pad.value = '';
//makeInflect();
//moveframey('scf')
}

function makeInflect() {

var n = ['','1st','2nd','3rd'];

	var x = DinfN[0];

	var out = "DinfN['"+x[0]+"'] = [];\n";
	out+= "DinfN['"+x[0]+"']['"+x[2]+"'] = [];\n";
	out+= "DinfN['"+x[0]+"']['"+x[2]+"']['"+x[4]+"'] = [];\n";
	out+= "DinfN['"+x[0]+"']['"+x[2]+"']['"+x[4]+"']['"+x[5]+"'] = [];\n";
	out+= "DinfN['"+x[0]+"']['"+x[2]+"']['"+x[4]+"']['"+x[5]+"']['"+(x[6] == 's' ? 0 : 1)+"'] = ['"+x[9]+"'";
	for (i = 1; i < DinfN.length; i++) {
		if(x[0] != DinfN[i][0]) out+= "];\nDinfN['"+DinfN[i][0]+"'] = [];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"'] = [];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"'] = [];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"'] = [];;\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"']['"+(DinfN[i][6] == 's' ? 0 : 1)+"'] = ['"+DinfN[i][9]+"'";
		else if(x[2] != DinfN[i][2]) out+= "];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"'] = [];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"'] = [];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"'] = [];;\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"']['"+(DinfN[i][6] == 's' ? 0 : 1)+"'] = ['"+DinfN[i][9]+"'";
		else if(x[4] != DinfN[i][4]) out+= "];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"'] = [];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"'] = [];;\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"']['"+(DinfN[i][6] == 's' ? 0 : 1)+"'] = ['"+DinfN[i][9]+"'";
		else if(x[5] != DinfN[i][5]) out+= "];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"'] = [];;\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"']['"+(DinfN[i][6] == 's' ? 0 : 1)+"'] = ['"+DinfN[i][9]+"'";
		else if(x[6] != DinfN[i][6]) out+= "];\nDinfN['"+DinfN[i][0]+"']['"+DinfN[i][2]+"']['"+DinfN[i][4]+"']['"+DinfN[i][5]+"']['"+(DinfN[i][6] == 's' ? 0 : 1)+"'] = ['"+DinfN[i][9]+"'";
 		else {
			out+= ",'"+DinfN[i][9]+"'";
		}
		x = DinfN[i];
	}
	document.textpad.pad.value = out;
}	
var DinfN = [];
DinfN.push(["abhijānāti",1,"abhijānāti",1,65535,3,"s",0,1,"abhijānāti"]);
DinfN.push(["abhijānāti",1,"abhijānāti",1,65535,3,"pl",1,1,"abhijānanti"]);
DinfN.push(["abhijānāti",1,"abhijānāti",1,65535,2,"s",2,1,"abhijānāsi"]);
DinfN.push(["abhijānāti",1,"abhijānāti",1,65535,2,"pl",3,1,"abhijānātha"]);
DinfN.push(["abhijānāti",1,"abhijānāti",1,65535,1,"s",4,1,"abhijānāmi"]);
DinfN.push(["abhijānāti",1,"abhijānāti",1,65535,1,"pl",5,1,"abhijānāma"]);
DinfN.push(["abhijānāti",1,"",,1,3,"s",0,1,"<no 3rd sing form>"]);
DinfN.push(["abhijānāti",1,"",,1,2,"s",2,1,"abhijānāhi"]);
DinfN.push(["abhijānāti",1,"",,3,3,"s",0,1,"abhijānissati"]);
DinfN.push(["abhijānāti",1,"",,3,3,"pl",1,1,"abhijānissanti"]);
DinfN.push(["abhijānāti",1,"",,3,2,"s",2,1,"abhijānissasi"]);
DinfN.push(["abhijānāti",1,"",,3,2,"pl",3,1,"abhijānissatha"]);
DinfN.push(["abhijānāti",1,"",,3,1,"s",4,1,"abhijānissāmi"]);
DinfN.push(["abhijānāti",1,"",,3,1,"pl",5,1,"abhijānissāma"]);
DinfN.push(["abhijānāti",1,"",,4,3,"s",0,1,"abhijāneyya"]);
DinfN.push(["abhijānāti",1,"",,4,3,"s",0,2,"abhijaṭṭā"]);
DinfN.push(["abhisaṅkharoti",1,"abhisaṅkharoti",1,65535,3,"s",0,1,"abhisaṅkharoti"]);
DinfN.push(["abhisaṅkharoti",1,"abhisaṅkharoti",1,65535,3,"pl",1,1,"abhisaṅkharonti"]);
DinfN.push(["abhisaṅkharoti",1,"",,4,3,"s",0,1,"abhisaṅkhareyya"]);
DinfN.push(["abhisaṅkharoti",1,"",,4,1,"s",4,1,"abhisaṅkhareyyaṃ"]);
DinfN.push(["acchati",1,"acchati",1,65535,3,"s",0,1,"acchati"]);
DinfN.push(["acchati",1,"acchati",1,65535,3,"pl",1,1,"acchanti"]);
DinfN.push(["acchati",1,"acchati",1,65535,3,"pl",1,2,"acchenti"]);
DinfN.push(["acchati",1,"acchati",1,65535,2,"s",2,1,"acchasi"]);
DinfN.push(["acchati",1,"acchati",1,65535,1,"s",4,1,"acchāmi"]);
DinfN.push(["acchati",1,"",,1,3,"s",0,1,"acchatu"]);
DinfN.push(["acchati",1,"",,1,2,"s",2,1,"accha"]);
DinfN.push(["acchati",1,"",,4,3,"s",0,1,"accheyya"]);
DinfN.push(["acchati",1,"",,13,3,"s",0,1,"acchataṃ"]);
DinfN.push(["acchati",1,"",,13,2,"s",2,1,"acchassu"]);
DinfN.push(["ādadāti",1,"ādadāti",1,65535,3,"s",0,1,"ādadāti"]);
DinfN.push(["addasa",1,"addasa",1,65535,3,"s",0,1,"addasa"]);
DinfN.push(["addasā",1,"addasā",1,65535,3,"s",0,1,"addasā"]);
DinfN.push(["addasā",1,"addasā",1,65535,3,"pl",1,1,"addasaṃsu"]);
DinfN.push(["addasā",1,"addasā",1,65535,2,"s",2,1,"addasā"]);
DinfN.push(["addasā",1,"addasā",1,65535,2,"pl",3,1,"addasatha"]);
DinfN.push(["addasā",1,"addasā",1,65535,1,"s",4,1,"addasaṃ"]);
DinfN.push(["addasā",1,"addasā",1,65535,1,"s",4,2,"addakkhiṃ"]);
DinfN.push(["addasā",1,"addasā",1,65535,1,"pl",5,1,"addasāma"]);
DinfN.push(["adhiṭṭhāti",1,"adhiṭṭhahati",1,65535,3,"s",0,3,"adhiṭṭhahati"]);
DinfN.push(["adhiṭṭhāti",1,"adhiṭṭhahati",1,65535,3,"pl",1,1,"adhiṭṭhahanti"]);
DinfN.push(["adhiṭṭhāti",1,"adhiṭṭhāti",1,65535,3,"s",0,1,"adhiṭṭhāti"]);
DinfN.push(["adhiṭṭhāti",1,"adhiṭṭhāti",1,65535,3,"s",0,2,"adhitiṭṭhati"]);
DinfN.push(["adhiṭṭhāti",1,"adhiṭṭhāti",1,65535,3,"s",0,4,"adhiṭṭheti"]);
DinfN.push(["adhiṭṭhāti",1,"adhiṭṭhāti",1,65535,3,"pl",1,2,"adhiṭṭhenti"]);
DinfN.push(["adhiṭṭhāti",1,"adhiṭṭhāti",1,65535,2,"s",2,1,"adhitiṭṭhasi"]);
DinfN.push(["adhiṭṭhāti",1,"adhiṭṭhāti",1,65535,1,"s",4,1,"adhiṭṭhāmi"]);
DinfN.push(["adhiṭṭhāti",1,"adhiṭṭhāti",1,65535,1,"pl",5,1,"adhiṭṭhema"]);
DinfN.push(["adhiṭṭhāti",1,"",,1,3,"s",0,1,"<no 3rd sing form>"]);
DinfN.push(["adhiṭṭhāti",1,"",,1,2,"s",2,1,"adhiṭṭhāhi"]);
DinfN.push(["adhiṭṭhāti",1,"",,1,2,"s",2,2,"adhiṭṭhehi"]);
DinfN.push(["adhiṭṭhāti",1,"",,4,3,"s",0,1,"adhiṭṭhaheyya"]);
DinfN.push(["adhiṭṭhāti",1,"",,4,3,"s",0,2,"adhiṭṭheyya"]);
DinfN.push(["adhiṭṭhāti",1,"",,4,2,"s",2,1,"adhiṭṭhaheyyāsi"]);
DinfN.push(["adhiseti",1,"adhiseti",1,65535,3,"s",0,1,"adhiseti"]);
DinfN.push(["adhiseti",1,"adhiseti",1,65535,3,"s",0,2,"adhisayati"]);
DinfN.push(["adhiseti",1,"",,4,3,"s",0,1,"adhisayeyya"]);
DinfN.push(["ādisati",1,"ādisati",1,65535,3,"s",0,1,"ādisati"]);
DinfN.push(["ādisati",1,"ādisati",1,65535,3,"pl",1,1,"ādisanti"]);
DinfN.push(["ādisati",1,"",,4,3,"s",0,1,"ādiseyya"]);
DinfN.push(["ādisati",1,"",,4,3,"s",0,2,"ādise"]);
DinfN.push(["ādisati",1,"",,4,2,"s",2,1,"ādiseyyāsi"]);
DinfN.push(["ādiyati",1,"ādiyati",1,65535,3,"s",0,1,"ādiyati"]);
DinfN.push(["ādiyati",1,"ādiyati",1,65535,3,"s",0,2,"ādeti"]);
DinfN.push(["ādiyati",1,"ādiyati",1,65535,3,"s",0,3,"ādatte"]);
DinfN.push(["ādiyati",1,"ādiyati",1,65535,3,"pl",1,1,"ādiyanti"]);
DinfN.push(["ādiyati",1,"ādiyati",1,65535,3,"pl",1,2,"ādenti"]);
DinfN.push(["ādiyati",1,"ādiyati",1,65535,2,"s",2,1,"ādiyasi"]);
DinfN.push(["ādiyati",1,"ādiyati",1,65535,2,"pl",3,1,"ādiyatha"]);
DinfN.push(["ādiyati",1,"ādiyati",1,65535,2,"pl",3,2,"ādetha"]);
DinfN.push(["ādiyati",1,"ādiyati",1,65535,1,"s",4,1,"ādiyāmi"]);
DinfN.push(["ādiyati",1,"ādiyati",1,65535,1,"pl",5,1,"ādiyāma"]);
DinfN.push(["ādiyati",1,"",,1,3,"s",0,1,"<no 3rd sing form>"]);
DinfN.push(["ādiyati",1,"",,1,3,"pl",1,1,"ādiyantu"]);
DinfN.push(["ādiyati",1,"",,1,2,"s",2,1,"ādiya"]);
DinfN.push(["ādiyati",1,"",,3,3,"s",0,1,"ādiyissati"]);
DinfN.push(["ādiyati",1,"",,3,3,"pl",1,1,"ādiyissanti"]);
DinfN.push(["ādiyati",1,"",,3,2,"s",2,1,"ādiyissasi"]);
DinfN.push(["ādiyati",1,"",,3,2,"pl",3,1,"ādiyissatha"]);
DinfN.push(["ādiyati",1,"",,3,1,"s",4,1,"ādiyissāmi"]);
DinfN.push(["ādiyati",1,"",,3,1,"pl",5,1,"ādiyissāma"]);
DinfN.push(["ādiyati",1,"",,4,3,"s",0,1,"ādiyeyya"]);
DinfN.push(["ādiyati",1,"",,4,3,"pl",1,1,"ādiyeyyuṃ"]);
DinfN.push(["ādiyati",1,"",,4,2,"s",2,1,"ādiyeyyāsi"]);
DinfN.push(["ādiyati",1,"",,4,2,"pl",3,1,"ādiyeyyātha"]);
DinfN.push(["ādiyati",1,"",,4,1,"s",4,1,"ādiyeyyaṃ"]);
DinfN.push(["ādiyati",1,"",,4,1,"pl",5,1,"ādiyeyyāma"]);
DinfN.push(["āhari",1,"āhari",1,65535,3,"s",0,1,"āhāsi"]);
DinfN.push(["āhari",1,"āhari",1,65535,3,"s",0,2,"āhari"]);
DinfN.push(["āhari",1,"āhari",1,65535,3,"s",0,3,"āharesi"]);
DinfN.push(["āhari",1,"āhari",1,65535,3,"pl",1,1,"āhariṃsu"]);
DinfN.push(["āhari",1,"āhari",1,65535,3,"pl",1,2,"āhaṃsu"]);
DinfN.push(["āhari",1,"āhari",1,65535,1,"s",4,1,"āhariṃ"]);
DinfN.push(["āhari",1,"āhari",1,65535,1,"pl",5,1,"āharāma"]);
DinfN.push(["āhari",1,"āhari",1,65535,1,"pl",5,2,"āharimha"]);
DinfN.push(["ahosi",1,"ahosi",1,65535,3,"s",0,1,"ahosi"]);
DinfN.push(["ahosi",1,"ahosi",1,65535,3,"pl",1,1,"ahesuṃ"]);
DinfN.push(["ahosi",1,"ahosi",1,65535,2,"s",2,1,"ahosi"]);
DinfN.push(["ahosi",1,"ahosi",1,65535,2,"pl",3,1,"ahuvattha"]);
DinfN.push(["ahosi",1,"ahosi",1,65535,1,"s",4,1,"ahosiṃ"]);
DinfN.push(["ahosi",1,"ahosi",1,65535,1,"pl",5,1,"ahumha"]);
DinfN.push(["ājānāti",1,"ājānāti",1,65535,3,"s",0,1,"ājānāti"]);
DinfN.push(["ājānāti",1,"ājānāti",1,65535,3,"s",0,2,"aṭṭāti"]);
DinfN.push(["ājānāti",1,"ājānāti",1,65535,3,"pl",1,1,"ājānanti"]);
DinfN.push(["ājānāti",1,"ājānāti",1,65535,2,"s",2,1,"ājānāsi"]);
DinfN.push(["ājānāti",1,"ājānāti",1,65535,2,"pl",3,1,"ājānātha"]);
DinfN.push(["ājānāti",1,"ājānāti",1,65535,1,"s",4,1,"ājānāmi"]);
DinfN.push(["ājānāti",1,"ājānāti",1,65535,1,"pl",5,1,"ājānāma"]);
DinfN.push(["ājānāti",1,"",,1,3,"s",0,1,"<no 3rd sing form>"]);
DinfN.push(["ājānāti",1,"",,1,2,"s",2,1,"ājānāhi"]);
DinfN.push(["ājānāti",1,"",,4,3,"s",0,1,"ājāneyya"]);
DinfN.push(["ājānāti",1,"",,4,3,"pl",1,1,"ājāneyyuṃ"]);
DinfN.push(["ājānāti",1,"",,4,2,"s",2,1,"ājāneyyāsi"]);
DinfN.push(["ājānāti",1,"",,4,2,"pl",3,1,"ājāneyyātha"]);
DinfN.push(["ājānāti",1,"",,4,1,"s",4,1,"ājāneyyaṃ"]);
DinfN.push(["ājānāti",1,"",,4,1,"pl",5,1,"ājāneyyāma"]);
DinfN.push(["ajjhagā",1,"ajjhagā",1,65535,3,"s",0,1,"ajjhagā"]);
DinfN.push(["ajjhagā",1,"ajjhagā",1,65535,3,"pl",1,1,"ajjhagu"]);
DinfN.push(["ajjhagā",1,"ajjhagā",1,65535,3,"pl",1,2,"ajjhagū"]);
DinfN.push(["ajjhagā",1,"ajjhagā",1,65535,3,"pl",1,3,"ajjhaguṃ"]);
DinfN.push(["ajjhagā",1,"ajjhagā",1,65535,3,"pl",1,4,"ajjhagaṃsu"]);
DinfN.push(["ajjhagā",1,"ajjhagā",1,65535,2,"s",2,1,"ajjhagā"]);
DinfN.push(["ajjhagā",1,"ajjhagā",1,65535,1,"s",4,1,"adhigaṃ"]);
DinfN.push(["ajjhagā",1,"ajjhagā",1,65535,1,"s",4,2,"ajjhagaṃ"]);
DinfN.push(["ajjhagā",1,"ajjhagā",1,65535,1,"s",4,3,"ajjhagā"]);
DinfN.push(["ajjhagamā",1,"ajjhagamā",1,65535,3,"s",0,1,"ajjhagamā"]);
DinfN.push(["ajjhagamā",1,"ajjhagamā",1,65535,3,"s",0,2,"ajjhagacchi"]);
DinfN.push(["ajjhagamā",1,"ajjhagamā",1,65535,3,"s",0,3,"ajjhagaṭchi"]);
DinfN.push(["ajjhagamā",1,"ajjhagamā",1,65535,3,"s",0,4,"adhigacchi"]);
DinfN.push(["ajjhagamā",1,"ajjhagamā",1,65535,3,"s",0,5,"adhigaṭchi"]);
DinfN.push(["ajjhagamā",1,"ajjhagamā",1,65535,3,"pl",1,1,"ajjhagamaṃsu"]);
DinfN.push(["ajjhagamā",1,"ajjhagamā",1,65535,3,"pl",1,2,"ajjhagamuṃ"]);
DinfN.push(["ajjhagamā",1,"ajjhagamā",1,65535,3,"pl",1,3,"ajjhagaṃsu"]);
DinfN.push(["ajjhagamā",1,"ajjhagamā",1,65535,3,"pl",1,4,"adhigamiṃsu"]);
DinfN.push(["ajjhagamā",1,"ajjhagamā",1,65535,3,"pl",1,5,"adhigacchiṃsu"]);
DinfN.push(["ajjhagamā",1,"ajjhagamā",1,65535,2,"s",2,1,"ajjhagamā"]);
DinfN.push(["ajjhagamā",1,"ajjhagamā",1,65535,2,"s",2,2,"ajjhagamāsi"]);
DinfN.push(["ajjhagamā",1,"ajjhagamā",1,65535,1,"s",4,1,"ajjhagamaṃ"]);
DinfN.push(["ajjhagamā",1,"ajjhagamā",1,65535,1,"s",4,2,"ajjhagamiṃ"]);
DinfN.push(["ajjhagamā",1,"ajjhagamā",1,65535,1,"s",4,3,"adhigamiṃ"]);
DinfN.push(["ajjhagamā",1,"ajjhagamā",1,65535,1,"s",4,4,"adhigacchiṃ"]);
DinfN.push(["ajjhagamā",1,"ajjhagamā",1,65535,1,"s",4,5,"adhigacchissaṃ"]);
DinfN.push(["ajjhagamā",1,"ajjhagamā",1,65535,1,"pl",5,1,"ajjhagamāmase"]);
DinfN.push(["āneti",1,"ānayati",1,65535,3,"s",0,1,"ānayati"]);
DinfN.push(["āneti",1,"ānayati",1,65535,1,"s",4,1,"ānayāmi"]);
DinfN.push(["āneti",1,"āneti",1,65535,3,"s",0,1,"āneti"]);
DinfN.push(["āneti",1,"āneti",1,65535,3,"pl",1,1,"ānenti"]);
DinfN.push(["āneti",1,"āneti",1,65535,2,"s",2,1,"ānesi"]);
DinfN.push(["āneti",1,"āneti",1,65535,2,"pl",3,1,"ānetha"]);
DinfN.push(["āneti",1,"āneti",1,65535,1,"s",4,1,"ānemi"]);
DinfN.push(["āneti",1,"āneti",1,65535,1,"pl",5,1,"ānema"]);
DinfN.push(["āneti",1,"",,1,3,"s",0,1,"<no 3rd sing form>"]);
DinfN.push(["āneti",1,"",,1,2,"s",2,1,"ānehi"]);
DinfN.push(["āneti",1,"",,4,3,"s",0,1,"āneyya"]);
DinfN.push(["āneti",1,"",,4,2,"pl",3,1,"āneyyātha"]);
DinfN.push(["āneti",1,"",,4,1,"pl",5,1,"āneyyāma"]);
DinfN.push(["antaradhāyati",1,"antaradhāyati",1,65535,3,"s",0,1,"antaradhāyati"]);
DinfN.push(["antaradhāyati",1,"antaradhāyati",1,65535,3,"pl",1,1,"antaradhāyanti"]);
DinfN.push(["antaradhāyati",1,"antaradhāyati",1,65535,2,"s",2,1,"antaradhāyasi"]);
DinfN.push(["antaradhāyati",1,"antaradhāyati",1,65535,2,"pl",3,1,"antaradhāyatha"]);
DinfN.push(["antaradhāyati",1,"antaradhāyati",1,65535,1,"s",4,1,"antaradhāyāmi"]);
DinfN.push(["antaradhāyati",1,"antaradhāyati",1,65535,1,"pl",5,1,"antaradhāyāma"]);
DinfN.push(["antaradhāyati",1,"",,1,3,"s",0,1,"antaradhāyatu"]);
DinfN.push(["antaradhāyati",1,"",,1,3,"pl",1,1,"antaradhāyantu"]);
DinfN.push(["antaradhāyati",1,"",,1,2,"s",2,1,"antaradhāyāhi"]);
DinfN.push(["antaradhāyati",1,"",,1,2,"pl",3,1,"antaradhāyatha"]);
DinfN.push(["antaradhāyati",1,"",,1,1,"s",4,1,"antaradhāyāmi"]);
DinfN.push(["antaradhāyati",1,"",,1,1,"pl",5,1,"antaradhāyāma"]);
DinfN.push(["antaradhāyati",1,"",,3,3,"s",0,1,"antaradhāyissati"]);
DinfN.push(["antaradhāyati",1,"",,3,3,"pl",1,1,"antaradhāyissanti"]);
DinfN.push(["antaradhāyati",1,"",,3,2,"s",2,1,"antaradhāyissasi"]);
DinfN.push(["antaradhāyati",1,"",,3,2,"pl",3,1,"antaradhāyissatha"]);
DinfN.push(["antaradhāyati",1,"",,3,1,"s",4,1,"antaradhāyissāmi"]);
DinfN.push(["antaradhāyati",1,"",,3,1,"pl",5,1,"antaradhāyissāma"]);
DinfN.push(["antaradhāyati",1,"",,4,3,"s",0,1,"antaradhāyeyya"]);
DinfN.push(["antaradhāyati",1,"",,12,3,"s",0,1,"antaradhāyatha"]);
DinfN.push(["antaradhāyati",1,"",,13,3,"s",0,1,"<no 3rd sing form>"]);
DinfN.push(["antaradhāyati",1,"",,13,2,"s",2,1,"antaradhāyassu"]);
DinfN.push(["anubhoti",1,"anubhoti",1,65535,3,"s",0,1,"anubhoti"]);
DinfN.push(["anubhoti",1,"anubhoti",1,65535,3,"pl",1,1,"anubhonti"]);
DinfN.push(["anubhoti",1,"anubhoti",1,65535,2,"s",2,1,"anubhosi"]);
DinfN.push(["anubhoti",1,"anubhoti",1,65535,2,"pl",3,1,"anubhotha"]);
DinfN.push(["anubhoti",1,"anubhoti",1,65535,1,"s",4,1,"anubhomi"]);
DinfN.push(["anubhoti",1,"anubhoti",1,65535,1,"pl",5,1,"anubhoma"]);
DinfN.push(["anubhoti",1,"",,1,3,"s",0,1,"anubhotu"]);
DinfN.push(["anubhoti",1,"",,1,3,"pl",1,1,"anubhontu"]);
DinfN.push(["anubhoti",1,"",,1,2,"s",2,1,"anubhohi"]);
DinfN.push(["anudadāti",1,"anudadāti",1,65535,3,"s",0,1,"<no 3rd sing form>"]);
DinfN.push(["anukaroti",1,"anukaroti",1,65535,3,"s",0,1,"anukaroti"]);
DinfN.push(["anukaroti",1,"anukaroti",1,65535,3,"pl",1,1,"anukaronti"]);
DinfN.push(["anukaroti",1,"anukaroti",1,65535,3,"pl",1,2,"anukubbanti"]);
DinfN.push(["anukaroti",1,"anukaroti",1,65535,1,"s",4,1,"anukaromi"]);
DinfN.push(["anukaroti",1,"",,1,3,"s",0,1,"<no 3rd sing form>"]);
DinfN.push(["anukaroti",1,"",,1,3,"pl",1,1,"anukarontu"]);
DinfN.push(["anuppadeti",1,"anuppadeti",1,65535,3,"s",0,1,"anuppadeti"]);
DinfN.push(["anuppadeti",1,"anuppadeti",1,65535,3,"s",0,2,"anupadeti"]);
DinfN.push(["anuppadeti",1,"anuppadeti",1,65535,2,"s",2,1,"anuppadesi"]);
DinfN.push(["anuppadeti",1,"anuppadeti",1,65535,1,"s",4,1,"anuppademi"]);
DinfN.push(["anuppadeti",1,"",,1,3,"s",0,1,"anuppadetu"]);
DinfN.push(["anuppadeti",1,"",,1,2,"s",2,1,"anuppadehi"]);
DinfN.push(["anuppadeti",1,"",,4,3,"s",0,1,"anupadajjeyya"]);
DinfN.push(["anuppadeti",1,"",,4,3,"pl",1,1,"anuppadajjuṃ"]);
DinfN.push(["anuppadeti",1,"",,4,3,"pl",1,2,"anuppadajjeyyuṃ"]);
DinfN.push(["anuppadeti",1,"",,4,2,"s",2,1,"anuppadajjeyyāsi"]);
DinfN.push(["anuppadeti",1,"",,4,2,"s",2,2,"anupadajjeyyāsi"]);
DinfN.push(["anuppadeti",1,"",,4,2,"s",2,3,"anuppadeyyāsi"]);
DinfN.push(["anuppadeti",1,"",,4,1,"pl",5,1,"anupadajjeyyāmā"]);
DinfN.push(["anuseti",1,"anuseti",1,65535,3,"s",0,1,"anuseti"]);
DinfN.push(["anuseti",1,"anuseti",1,65535,3,"pl",1,1,"anusenti"]);
DinfN.push(["anvagā",1,"anvagā",1,65535,3,"s",0,1,"anvagā"]);
DinfN.push(["anvagā",1,"anvagā",1,65535,3,"s",0,2,"anvagaṃ"]);
DinfN.push(["anvagā",1,"anvagā",1,65535,3,"s",0,3,"anvagū"]);
DinfN.push(["anvagā",1,"anvagā",1,65535,3,"pl",1,1,"anvagū"]);
DinfN.push(["anvagā",1,"anvagā",1,65535,1,"s",4,1,"anvagaṃ"]);
DinfN.push(["anvagā",1,"anvagā",1,65535,1,"s",4,2,"annagā"]);
DinfN.push(["anvagā",1,"anvagā",1,65535,1,"s",4,3,"anvagū"]);
DinfN.push(["ārabhati",1,"ārabhati",1,65535,3,"s",0,1,"ārabhati"]);
DinfN.push(["ārabhati",1,"ārabhati",1,65535,3,"s",0,2,"ārambhati"]);
DinfN.push(["ārabhati",1,"ārabhati",1,65535,3,"s",0,3,"ārabbhati"]);
DinfN.push(["ārabhati",1,"ārabhati",1,65535,3,"pl",1,1,"ārabhanti"]);
DinfN.push(["ārabhati",1,"ārabhati",1,65535,2,"pl",3,1,"ārabhatha"]);
DinfN.push(["ārabhati",1,"ārabhati",1,65535,1,"s",4,1,"ārabhāmi"]);
DinfN.push(["ārabhati",1,"",,12,3,"s",0,1,"ārabhate"]);
DinfN.push(["ārabhati",1,"",,13,3,"s",0,1,"<no 3rd sing forms>"]);
DinfN.push(["ārabhati",1,"",,13,2,"pl",3,1,"ārabhavho"]);
DinfN.push(["āsi",1,"āsi",1,65535,3,"s",0,1,"āsi"]);
DinfN.push(["āsi",1,"āsi",1,65535,3,"pl",1,1,"āsuṃ"]);
DinfN.push(["āsi",1,"āsi",1,65535,3,"pl",1,2,"āsu"]);
DinfN.push(["āsi",1,"āsi",1,65535,3,"pl",1,3,"āsiṃsu"]);
DinfN.push(["āsi",1,"āsi",1,65535,3,"pl",1,4,"āsisuṃ"]);
DinfN.push(["āsi",1,"āsi",1,65535,2,"s",2,1,"āsi"]);
DinfN.push(["āsi",1,"āsi",1,65535,1,"s",4,1,"āsiṃ"]);
DinfN.push(["āsi",1,"āsi",1,65535,1,"pl",5,1,"āsimhā"]);
DinfN.push(["assa",1,"assa",1,65535,3,"s",0,1,"siyā"]);
DinfN.push(["assa",1,"assa",1,65535,3,"s",0,2,"assa"]);
DinfN.push(["assa",1,"assa",1,65535,3,"s",0,3,"assu"]);
DinfN.push(["assa",1,"assa",1,65535,3,"pl",1,1,"siyuṃ"]);
DinfN.push(["assa",1,"assa",1,65535,3,"pl",1,2,"siyaṃsu"]);
DinfN.push(["assa",1,"assa",1,65535,3,"pl",1,3,"assuṃ"]);
DinfN.push(["assa",1,"assa",1,65535,2,"s",2,1,"siyā"]);
DinfN.push(["assa",1,"assa",1,65535,2,"s",2,2,"assa"]);
DinfN.push(["assa",1,"assa",1,65535,2,"s",2,3,"assasi"]);
DinfN.push(["assa",1,"assa",1,65535,2,"s",2,4,"assu"]);
DinfN.push(["assa",1,"assa",1,65535,2,"pl",3,1,"assatha"]);
DinfN.push(["assa",1,"assa",1,65535,1,"s",4,1,"siyaṃ"]);
DinfN.push(["assa",1,"assa",1,65535,1,"s",4,2,"siyā"]);
DinfN.push(["assa",1,"assa",1,65535,1,"s",4,3,"assaṃ"]);
DinfN.push(["assa",1,"assa",1,65535,1,"pl",5,1,"assāma"]);
DinfN.push(["assosi",1,"assosi",1,65535,3,"s",0,1,"assosi"]);
DinfN.push(["assosi",1,"assosi",1,65535,3,"pl",1,1,"assosuṃ"]);
DinfN.push(["assosi",1,"assosi",1,65535,2,"s",2,1,"assosi"]);
DinfN.push(["assosi",1,"assosi",1,65535,2,"pl",3,1,"assuttha"]);
DinfN.push(["assosi",1,"assosi",1,65535,1,"s",4,1,"assosiṃ"]);
DinfN.push(["assosi",1,"assosi",1,65535,1,"pl",5,1,"assumha"]);
DinfN.push(["atibhoti",1,"atibhoti",1,65535,3,"s",0,1,"atibhoti"]);
DinfN.push(["atibhoti",1,"atibhoti",1,65535,3,"pl",1,1,"atibhonti"]);
DinfN.push(["atibhoti",1,"atibhoti",1,65535,1,"s",4,1,"atibhomi"]);
DinfN.push(["atigacchati",1,"accagā",1,65535,3,"s",0,2,"accagā"]);
DinfN.push(["atigacchati",1,"accagā",1,65535,3,"s",0,3,"atigā"]);
DinfN.push(["atigacchati",1,"accagā",1,65535,3,"pl",1,1,"accaguṃ"]);
DinfN.push(["atigacchati",1,"accagā",1,65535,3,"pl",1,2,"accagū"]);
DinfN.push(["atigacchati",1,"accagamā",1,65535,3,"s",0,1,"accagamā"]);
DinfN.push(["atthi",1,"atthi",1,65535,3,"s",0,1,"atthi"]);
DinfN.push(["atthi",1,"atthi",1,65535,3,"pl",1,1,"santi"]);
DinfN.push(["atthi",1,"atthi",1,65535,2,"s",2,1,"asi"]);
DinfN.push(["atthi",1,"atthi",1,65535,2,"s",2,2,"si"]);
DinfN.push(["atthi",1,"atthi",1,65535,2,"pl",3,1,"attha"]);
DinfN.push(["atthi",1,"atthi",1,65535,1,"s",4,1,"asmi"]);
DinfN.push(["atthi",1,"atthi",1,65535,1,"s",4,2,"smi"]);
DinfN.push(["atthi",1,"atthi",1,65535,1,"s",4,3,"amhi"]);
DinfN.push(["atthi",1,"atthi",1,65535,1,"s",4,4,"mhi"]);
DinfN.push(["atthi",1,"atthi",1,65535,1,"pl",5,1,"asma"]);
DinfN.push(["atthi",1,"atthi",1,65535,1,"pl",5,2,"asmā"]);
DinfN.push(["atthi",1,"atthi",1,65535,1,"pl",5,3,"amha"]);
DinfN.push(["atthi",1,"atthi",1,65535,1,"pl",5,4,"smase"]);
DinfN.push(["atthi",1,"",,1,3,"s",0,1,"atthu"]);
DinfN.push(["atthi",1,"",,12,3,"s",0,1,"<no 3rd sing form>"]);
DinfN.push(["atthi",1,"",,12,1,"pl",5,1,"amhāse"]);
DinfN.push(["atthi",1,"",,12,1,"pl",5,2,"amhase"]);
DinfN.push(["atthi",1,"",,12,1,"pl",5,3,"amhā"]);
DinfN.push(["avoca",1,"avoca",1,65535,3,"s",0,1,"avoca"]);
DinfN.push(["avoca",1,"avoca",1,65535,3,"pl",1,1,"avocuṃ"]);
DinfN.push(["avoca",1,"avoca",1,65535,2,"s",2,1,"avoca"]);
DinfN.push(["avoca",1,"avoca",1,65535,2,"s",2,2,"(avaca)"]);
DinfN.push(["avoca",1,"avoca",1,65535,2,"pl",3,1,"avocuttha"]);
DinfN.push(["avoca",1,"avoca",1,65535,2,"pl",3,2,"(avacuttha)"]);
DinfN.push(["avoca",1,"avoca",1,65535,1,"s",4,1,"avocaṃ"]);
DinfN.push(["avoca",1,"avoca",1,65535,1,"pl",5,1,"avocumha"]);
DinfN.push(["avoca",1,"avoca",1,65535,1,"pl",5,2,"(avocumhā)"]);
DinfN.push(["brūti",1,"brūti",1,65535,3,"s",0,1,"brūti"]);
DinfN.push(["brūti",1,"brūti",1,65535,2,"s",2,1,"brūsi"]);
DinfN.push(["brūti",1,"brūti",1,65535,2,"pl",3,1,"brūtha"]);
DinfN.push(["brūti",1,"brūti",1,65535,1,"s",4,1,"brūmi"]);
DinfN.push(["brūti",1,"",,1,3,"s",0,1,"<no 3rd sng form>"]);
DinfN.push(["brūti",1,"",,1,2,"s",2,1,"brūhi"]);
DinfN.push(["cinteti",1,"cetayati",1,65535,3,"s",0,1,"cetayati"]);
DinfN.push(["cinteti",1,"cetayati",1,65535,3,"pl",1,1,"cetayanti"]);
DinfN.push(["cinteti",1,"cetayati",1,65535,2,"s",2,1,"cetayasi"]);
DinfN.push(["cinteti",1,"cetayati",1,65535,2,"pl",3,1,"cetayatha"]);
DinfN.push(["cinteti",1,"cetayati",1,65535,1,"s",4,1,"cetayāmi"]);
DinfN.push(["cinteti",1,"cetayati",1,65535,1,"pl",5,1,"cetayāma"]);
DinfN.push(["cinteti",1,"ceteti",1,65535,3,"s",0,1,"ceteti"]);
DinfN.push(["cinteti",1,"ceteti",1,65535,3,"pl",1,1,"cetenti"]);
DinfN.push(["cinteti",1,"ceteti",1,65535,2,"s",2,1,"cetesi"]);
DinfN.push(["cinteti",1,"ceteti",1,65535,2,"pl",3,1,"cetetha"]);
DinfN.push(["cinteti",1,"ceteti",1,65535,1,"s",4,1,"cetemi"]);
DinfN.push(["cinteti",1,"ceteti",1,65535,1,"pl",5,1,"cetema"]);
DinfN.push(["cinteti",1,"",,4,3,"s",0,1,"cinteyya"]);
DinfN.push(["cinteti",1,"",,4,3,"s",0,2,"cetaye"]);
DinfN.push(["cinteti",1,"",,4,3,"pl",1,1,"cinteyyuṃ"]);
DinfN.push(["cinteti",1,"",,4,2,"s",2,1,"cinteyyāsi"]);
DinfN.push(["cinteti",1,"",,4,2,"pl",3,1,"cinteyyātha"]);
DinfN.push(["cinteti",1,"",,4,1,"s",4,1,"cinteyyaṃ"]);
DinfN.push(["cinteti",1,"",,4,1,"s",4,2,"(cinteyyāmi)"]);
DinfN.push(["cinteti",1,"",,4,1,"pl",5,1,"cinteyyāma"]);
DinfN.push(["cinteti",1,"cintesi",1,65535,3,"s",0,1,"cintesi"]);
DinfN.push(["cinteti",1,"cintesi",1,65535,3,"pl",1,1,"cintesuṃ"]);
DinfN.push(["cinteti",1,"cintesi",1,65535,3,"pl",1,2,"acintayuṃ"]);
DinfN.push(["cinteti",1,"cintesi",1,65535,2,"s",2,1,"cintesi"]);
DinfN.push(["cinteti",1,"cintesi",1,65535,2,"pl",3,1,"cintittha"]);
DinfN.push(["cinteti",1,"cintesi",1,65535,1,"s",4,1,"cintesiṃ"]);
DinfN.push(["cinteti",1,"cintesi",1,65535,1,"pl",5,1,"cintimha"]);
DinfN.push(["dadāti",1,"adā",1,65535,3,"s",0,1,"adā"]);
DinfN.push(["dadāti",1,"adā",1,65535,2,"s",2,1,"ado"]);
DinfN.push(["dadāti",1,"adā",1,65535,2,"pl",3,1,"adattha"]);
DinfN.push(["dadāti",1,"adā",1,65535,2,"pl",3,2,"dattha"]);
DinfN.push(["dadāti",1,"adā",1,65535,1,"pl",5,1,"adamha"]);
DinfN.push(["dadāti",1,"adadi",1,65535,3,"s",0,1,"<no 3rd sng form>"]);
DinfN.push(["dadāti",1,"adadi",1,65535,1,"s",4,1,"adadaṃ"]);
DinfN.push(["dadāti",1,"dadāti",1,65535,3,"s",0,1,"dadāti"]);
DinfN.push(["dadāti",1,"dadāti",1,65535,3,"pl",1,1,"dadanti"]);
DinfN.push(["dadāti",1,"dadāti",1,65535,2,"s",2,1,"dadāsi"]);
DinfN.push(["dadāti",1,"dadāti",1,65535,2,"pl",3,1,"dadātha"]);
DinfN.push(["dadāti",1,"dadāti",1,65535,1,"s",4,1,"dadāmi"]);
DinfN.push(["dadāti",1,"dadāti",1,65535,1,"pl",5,1,"dadāma"]);
DinfN.push(["dadāti",1,"deti",1,65535,3,"s",0,1,"deti"]);
DinfN.push(["dadāti",1,"deti",1,65535,3,"pl",1,1,"denti"]);
DinfN.push(["dadāti",1,"deti",1,65535,2,"s",2,1,"desi"]);
DinfN.push(["dadāti",1,"deti",1,65535,2,"pl",3,1,"detha"]);
DinfN.push(["dadāti",1,"deti",1,65535,1,"s",4,1,"demi"]);
DinfN.push(["dadāti",1,"deti",1,65535,1,"s",4,2,"dammi"]);
DinfN.push(["dadāti",1,"deti",1,65535,1,"pl",5,1,"dema"]);
DinfN.push(["dadāti",1,"",,1,3,"s",0,1,"detu"]);
DinfN.push(["dadāti",1,"",,1,3,"pl",1,1,"dentu"]);
DinfN.push(["dadāti",1,"",,1,2,"s",2,1,"dehi"]);
DinfN.push(["dadāti",1,"",,1,2,"s",2,2,"dadāhi"]);
DinfN.push(["dadāti",1,"",,1,2,"pl",3,1,"detha"]);
DinfN.push(["dadāti",1,"",,1,1,"s",4,1,"demi"]);
DinfN.push(["dadāti",1,"",,1,1,"pl",5,1,"dema"]);
DinfN.push(["dadāti",1,"",,4,3,"s",0,1,"dadeyya"]);
DinfN.push(["dadāti",1,"",,4,3,"s",0,2,"dade"]);
DinfN.push(["dadāti",1,"",,4,3,"s",0,3,"dajjā"]);
DinfN.push(["dadāti",1,"",,4,3,"s",0,4,"dajjeyya"]);
DinfN.push(["dadāti",1,"",,4,2,"s",2,1,"dadeyyāsi"]);
DinfN.push(["dadāti",1,"",,4,2,"pl",3,1,"dajjeyyātha"]);
DinfN.push(["dadāti",1,"",,4,1,"s",4,1,"dadeyyaṃ"]);
DinfN.push(["dadāti",1,"",,4,1,"s",4,2,"dajjaṃ"]);
DinfN.push(["dakkhati",1,"dakkhati",1,65535,3,"s",0,1,"dakkhati"]);
DinfN.push(["dakkhati",1,"dakkhati",1,65535,3,"s",0,2,"dakkhiti"]);
DinfN.push(["dakkhati",1,"dakkhati",1,65535,3,"pl",1,1,"dakkhanti"]);
DinfN.push(["dakkhati",1,"dakkhati",1,65535,3,"pl",1,2,"dakkhinti"]);
DinfN.push(["dakkhati",1,"dakkhati",1,65535,2,"s",2,1,"dakkhasi"]);
DinfN.push(["dakkhati",1,"dakkhati",1,65535,2,"pl",3,1,"dakkhatha"]);
DinfN.push(["dakkhati",1,"dakkhati",1,65535,1,"s",4,1,"dakkhāmi"]);
DinfN.push(["dakkhati",1,"dakkhati",1,65535,1,"pl",5,1,"dakkhāma"]);
DinfN.push(["dakkhati",1,"",,1,3,"s",0,1,"<no 3rd sing form>"]);
DinfN.push(["dakkhati",1,"",,1,2,"s",2,1,"dakkha"]);
DinfN.push(["essati",1,"essati",1,65535,3,"s",0,1,"essati"]);
DinfN.push(["essati",1,"essati",1,65535,3,"s",0,2,"issati"]);
DinfN.push(["essati",1,"essati",1,65535,3,"s",0,3,"ehiti"]);
DinfN.push(["essati",1,"essati",1,65535,3,"pl",1,1,"essanti"]);
DinfN.push(["essati",1,"essati",1,65535,3,"pl",1,2,"issanti"]);
DinfN.push(["essati",1,"essati",1,65535,3,"pl",1,3,"ehinti"]);
DinfN.push(["essati",1,"essati",1,65535,2,"s",2,1,"essasi"]);
DinfN.push(["essati",1,"essati",1,65535,2,"s",2,2,"ehisi"]);
DinfN.push(["essati",1,"essati",1,65535,1,"s",4,1,"essāmi"]);
DinfN.push(["essati",1,"essati",1,65535,1,"s",4,2,"essaṃ"]);
DinfN.push(["eti",1,"eti",1,65535,3,"s",0,1,"eti"]);
DinfN.push(["eti",1,"eti",1,65535,3,"s",0,2,"ayati"]);
DinfN.push(["eti",1,"eti",1,65535,3,"s",0,3,"iti"]);
DinfN.push(["eti",1,"eti",1,65535,3,"pl",1,1,"enti"]);
DinfN.push(["eti",1,"eti",1,65535,2,"s",2,1,"esi"]);
DinfN.push(["eti",1,"eti",1,65535,2,"pl",3,1,"etha"]);
DinfN.push(["eti",1,"eti",1,65535,1,"s",4,1,"emi"]);
DinfN.push(["eti",1,"eti",1,65535,1,"pl",5,1,"ayāma"]);
DinfN.push(["eti",1,"",,1,3,"s",0,1,"etu"]);
DinfN.push(["eti",1,"",,1,2,"s",2,1,"ehi"]);
DinfN.push(["eti",1,"",,1,2,"s",2,2,"aya"]);
DinfN.push(["eti",1,"",,1,2,"pl",3,1,"etha"]);
DinfN.push(["eti",1,"",,4,3,"s",0,1,"eyya"]);
DinfN.push(["eti",1,"",,4,2,"s",2,1,"eyyāsi"]);
DinfN.push(["gacchi",1,"gacchi",1,65535,3,"s",0,1,"agamāsi"]);
DinfN.push(["gacchi",1,"gacchi",1,65535,3,"s",0,2,"gacchi"]);
DinfN.push(["gacchi",1,"gacchi",1,65535,3,"s",0,3,"agacchi"]);
DinfN.push(["gacchi",1,"gacchi",1,65535,3,"s",0,4,"agaṭchi"]);
DinfN.push(["gacchi",1,"gacchi",1,65535,3,"s",0,5,"agamā"]);
DinfN.push(["gacchi",1,"gacchi",1,65535,3,"s",0,6,"gami"]);
DinfN.push(["gacchi",1,"gacchi",1,65535,3,"s",0,7,"agā"]);
DinfN.push(["gacchi",1,"gacchi",1,65535,3,"pl",1,1,"gacchiṃsu"]);
DinfN.push(["gacchi",1,"gacchi",1,65535,3,"pl",1,2,"agamuṃ"]);
DinfN.push(["gacchi",1,"gacchi",1,65535,3,"pl",1,3,"agamaṃsu"]);
DinfN.push(["gacchi",1,"gacchi",1,65535,3,"pl",1,4,"agamiṃsu"]);
DinfN.push(["gacchi",1,"gacchi",1,65535,3,"pl",1,5,"agū"]);
DinfN.push(["gacchi",1,"gacchi",1,65535,2,"s",2,1,"agamā"]);
DinfN.push(["gacchi",1,"gacchi",1,65535,2,"pl",3,1,"agacchittha"]);
DinfN.push(["gacchi",1,"gacchi",1,65535,2,"pl",3,2,"(agamittha)"]);
DinfN.push(["gacchi",1,"gacchi",1,65535,1,"s",4,1,"gacchiṃ"]);
DinfN.push(["gacchi",1,"gacchi",1,65535,1,"s",4,2,"agacchiṃ"]);
DinfN.push(["gacchi",1,"gacchi",1,65535,1,"s",4,3,"agaṭchiṃ"]);
DinfN.push(["gacchi",1,"gacchi",1,65535,1,"s",4,4,"agamāsiṃ"]);
DinfN.push(["gacchi",1,"gacchi",1,65535,1,"pl",5,1,"agamiṃhase"]);
DinfN.push(["gacchi",1,"gacchi",1,65535,1,"pl",5,2,"agamamhā"]);
DinfN.push(["hanati",1,"hanti",1,65535,3,"s",0,1,"hanti"]);
DinfN.push(["hanati",1,"hanati",1,65535,3,"s",0,2,"hanati"]);
DinfN.push(["hanati",1,"hanati",1,65535,3,"s",0,3,"hanāti"]);
DinfN.push(["hanati",1,"hanati",1,65535,3,"pl",1,1,"hananti"]);
DinfN.push(["hanati",1,"hanati",1,65535,2,"s",2,1,"hanāsi"]);
DinfN.push(["hanati",1,"hanati",1,65535,2,"pl",3,1,"hanatha"]);
DinfN.push(["hanati",1,"hanati",1,65535,1,"s",4,1,"hanāmi"]);
DinfN.push(["hanati",1,"hanati",1,65535,1,"pl",5,1,"hanāma"]);
DinfN.push(["hanati",1,"",,1,3,"s",0,1,"<no 3rd sng form>"]);
DinfN.push(["hanati",1,"",,1,3,"pl",1,1,"hanantu"]);
DinfN.push(["hanati",1,"",,1,2,"s",2,1,"hana"]);
DinfN.push(["hanati",1,"",,4,3,"s",0,1,"haneyya"]);
DinfN.push(["hanati",1,"",,4,3,"s",0,2,"hane"]);
DinfN.push(["hanati",1,"",,4,3,"pl",1,1,"haneyyuṃ"]);
DinfN.push(["hanati",1,"",,4,1,"s",4,1,"haneyyaṃ"]);
DinfN.push(["hanati",1,"",,13,3,"s",0,1,"hanataṃ"]);
DinfN.push(["hanati",1,"",,13,2,"s",2,1,"hanassu"]);
DinfN.push(["hoti",1,"hehiti",1,65535,3,"s",0,1,"hessati"]);
DinfN.push(["hoti",1,"hehiti",1,65535,3,"s",0,2,"hehiti"]);
DinfN.push(["hoti",1,"hehiti",1,65535,3,"s",0,3,"hohiti"]);
DinfN.push(["hoti",1,"hehiti",1,65535,3,"pl",1,1,"hessanti"]);
DinfN.push(["hoti",1,"hehiti",1,65535,2,"s",2,1,"hohisi"]);
DinfN.push(["hoti",1,"hehiti",1,65535,2,"s",2,2,"hessasi"]);
DinfN.push(["hoti",1,"hehiti",1,65535,2,"s",2,3,"hehisi"]);
DinfN.push(["hoti",1,"hehiti",1,65535,2,"pl",3,1,"hessatha"]);
DinfN.push(["hoti",1,"hehiti",1,65535,1,"s",4,1,"hessāmi"]);
DinfN.push(["hoti",1,"hehiti",1,65535,1,"s",4,2,"hessaṃ"]);
DinfN.push(["hoti",1,"hehiti",1,65535,1,"pl",5,1,"hessāma"]);
DinfN.push(["hoti",1,"hoti",1,65535,3,"s",0,1,"hoti"]);
DinfN.push(["hoti",1,"hoti",1,65535,3,"pl",1,1,"honti"]);
DinfN.push(["hoti",1,"hoti",1,65535,2,"s",2,1,"hosi"]);
DinfN.push(["hoti",1,"hoti",1,65535,2,"pl",3,1,"hotha"]);
DinfN.push(["hoti",1,"hoti",1,65535,1,"s",4,1,"homi"]);
DinfN.push(["hoti",1,"hoti",1,65535,1,"pl",5,1,"homa"]);
DinfN.push(["hoti",1,"",,1,3,"s",0,1,"hotu"]);
DinfN.push(["hoti",1,"",,1,3,"pl",1,1,"hontu"]);
DinfN.push(["hoti",1,"",,1,2,"s",2,1,"hohi"]);
DinfN.push(["hoti",1,"",,1,2,"pl",3,1,"hotha"]);
DinfN.push(["hoti",1,"",,1,1,"s",4,1,"homi"]);
DinfN.push(["hoti",1,"",,1,1,"pl",5,1,"homa"]);
DinfN.push(["hoti",1,"huveyya",1,65535,3,"s",0,2,"hupeyya"]);
DinfN.push(["jānāti",1,"jaṭṭā",1,65535,3,"s",0,1,"jāneyya"]);
DinfN.push(["jānāti",1,"jaṭṭā",1,65535,3,"s",0,2,"jaṭṭā"]);
DinfN.push(["jānāti",1,"jaṭṭā",1,65535,3,"pl",1,1,"jāneyyuṃ"]);
DinfN.push(["jānāti",1,"jaṭṭā",1,65535,2,"s",2,1,"jāneyyāsi"]);
DinfN.push(["jānāti",1,"jaṭṭā",1,65535,2,"pl",3,1,"jāneyyātha"]);
DinfN.push(["jānāti",1,"jaṭṭā",1,65535,1,"s",4,1,"jāneyyaṃ"]);
DinfN.push(["jānāti",1,"jaṭṭā",1,65535,1,"s",4,2,"jāneyyāmi"]);
DinfN.push(["jānāti",1,"jaṭṭā",1,65535,1,"pl",5,1,"jāneyyāma"]);
DinfN.push(["jānāti",1,"jaṭṭā",1,65535,1,"pl",5,2,"jāniyāma"]);
DinfN.push(["jānāti",1,"jaṭṭā",1,65535,1,"pl",5,3,"jānemu"]);
DinfN.push(["jānāti",1,"jānāti",1,65535,3,"s",0,1,"jānāti"]);
DinfN.push(["jānāti",1,"jānāti",1,65535,3,"pl",1,1,"jānanti"]);
DinfN.push(["jānāti",1,"jānāti",1,65535,2,"s",2,1,"jānāsi"]);
DinfN.push(["jānāti",1,"jānāti",1,65535,2,"pl",3,1,"jānātha"]);
DinfN.push(["jānāti",1,"jānāti",1,65535,1,"s",4,1,"jānāmi"]);
DinfN.push(["jānāti",1,"jānāti",1,65535,1,"pl",5,1,"jānāma"]);
DinfN.push(["jānāti",1,"",,1,3,"s",0,1,"jānātu"]);
DinfN.push(["jānāti",1,"",,1,3,"pl",1,1,"jānantu"]);
DinfN.push(["jānāti",1,"",,1,2,"s",2,1,"jānāhi"]);
DinfN.push(["jānāti",1,"",,1,2,"pl",3,1,"jānātha"]);
DinfN.push(["jānāti",1,"",,1,1,"s",4,1,"jānāmi"]);
DinfN.push(["jānāti",1,"",,1,1,"pl",5,1,"jānāma"]);
DinfN.push(["jayati",1,"jayati",1,65535,3,"s",0,1,"jayati"]);
DinfN.push(["jayati",1,"jayati",1,65535,3,"pl",1,1,"jayanti"]);
DinfN.push(["jayati",1,"jayati",1,65535,2,"s",2,1,"jayasi"]);
DinfN.push(["jayati",1,"jayati",1,65535,2,"pl",3,1,"jayatha"]);
DinfN.push(["jayati",1,"jayati",1,65535,1,"s",4,1,"jayāmi"]);
DinfN.push(["jayati",1,"jayati",1,65535,1,"pl",5,1,"jayāma"]);
DinfN.push(["jayati",1,"jeti",1,65535,3,"s",0,1,"jeti"]);
DinfN.push(["jayati",1,"jeti",1,65535,3,"pl",1,1,"jenti"]);
DinfN.push(["jayati",1,"jeti",1,65535,2,"s",2,1,"jesi"]);
DinfN.push(["jayati",1,"jeti",1,65535,2,"pl",3,1,"jetha"]);
DinfN.push(["jayati",1,"jeti",1,65535,1,"s",4,1,"jemi"]);
DinfN.push(["jayati",1,"jeti",1,65535,1,"pl",5,1,"jema"]);
DinfN.push(["jayati",1,"jināti",1,65535,3,"s",0,1,"jināti"]);
DinfN.push(["jayati",1,"jināti",1,65535,3,"pl",1,1,"jinanti"]);
DinfN.push(["jayati",1,"jināti",1,65535,2,"s",2,1,"jināsi"]);
DinfN.push(["jayati",1,"jināti",1,65535,2,"pl",3,1,"jinātha"]);
DinfN.push(["jayati",1,"jināti",1,65535,1,"s",4,1,"jināmi"]);
DinfN.push(["jayati",1,"jināti",1,65535,1,"pl",5,1,"jināma"]);
DinfN.push(["jayati",1,"",,4,3,"s",0,1,"jeyya"]);
DinfN.push(["jayati",1,"",,4,3,"s",0,2,"jine"]);
DinfN.push(["jayati",1,"",,4,3,"pl",1,2,"jineyyuṃ"]);
DinfN.push(["karoti",1,"akā",1,65535,3,"s",0,1,"akā"]);
DinfN.push(["karoti",1,"akā",1,65535,3,"pl",1,1,"akaṃsu"]);
DinfN.push(["karoti",1,"akā",1,65535,2,"s",2,1,"akā"]);
DinfN.push(["karoti",1,"akā",1,65535,2,"pl",3,1,"akattha"]);
DinfN.push(["karoti",1,"akā",1,65535,1,"s",4,1,"akaṃ"]);
DinfN.push(["karoti",1,"akā",1,65535,1,"pl",5,1,"akamha"]);
DinfN.push(["karoti",1,"akari",1,65535,3,"s",0,1,"akaraṃ"]);
DinfN.push(["karoti",1,"akari",1,65535,3,"s",0,2,"akarā"]);
DinfN.push(["karoti",1,"akari",1,65535,3,"s",0,3,"akari"]);
DinfN.push(["karoti",1,"akari",1,65535,3,"s",0,4,"akarī"]);
DinfN.push(["karoti",1,"akari",1,65535,3,"s",0,5,"akarittha"]);
DinfN.push(["karoti",1,"akari",1,65535,3,"pl",1,1,"akaruṃ"]);
DinfN.push(["karoti",1,"akari",1,65535,3,"pl",1,2,"akariṃsu"]);
DinfN.push(["karoti",1,"akari",1,65535,2,"s",2,1,"akara"]);
DinfN.push(["karoti",1,"akari",1,65535,2,"s",2,2,"akarā"]);
DinfN.push(["karoti",1,"akari",1,65535,2,"s",2,3,"akari"]);
DinfN.push(["karoti",1,"akari",1,65535,2,"s",2,4,"akarī"]);
DinfN.push(["karoti",1,"akari",1,65535,2,"pl",3,1,"(akarittha)"]);
DinfN.push(["karoti",1,"akari",1,65535,1,"s",4,1,"akaraṃ"]);
DinfN.push(["karoti",1,"akari",1,65535,1,"s",4,2,"akariṃ"]);
DinfN.push(["karoti",1,"akari",1,65535,1,"pl",5,1,"akarāma"]);
DinfN.push(["karoti",1,"akari",1,65535,1,"pl",5,2,"akaramha"]);
DinfN.push(["karoti",1,"akari",1,65535,1,"pl",5,3,"akarimha"]);
DinfN.push(["karoti",1,"akāsi",1,65535,3,"s",0,1,"akāsi"]);
DinfN.push(["karoti",1,"akāsi",1,65535,2,"s",2,1,"akāsi"]);
DinfN.push(["karoti",1,"akāsi",1,65535,1,"s",4,1,"akāsiṃ"]);
DinfN.push(["karoti",1,"akāsi",1,65535,1,"s",4,2,"kāhāsiṃ"]);
DinfN.push(["karoti",1,"akāsi",1,65535,1,"pl",5,1,"akāsimha"]);
DinfN.push(["karoti",1,"kārāpesi",1,65535,3,"s",0,1,"kārāpesi"]);
DinfN.push(["karoti",1,"kārāpesi",1,65535,3,"pl",1,1,"kārāpesuṃ"]);
DinfN.push(["karoti",1,"kārāpesi",1,65535,3,"pl",1,2,"kārāpayiṃsu"]);
DinfN.push(["karoti",1,"kārāpesi",1,65535,1,"s",4,1,"kārāpesiṃ"]);
DinfN.push(["karoti",1,"kārāpesi",1,65535,1,"s",4,2,"kārapesiṃ"]);
DinfN.push(["karoti",1,"kārāpesi",1,65535,1,"s",4,3,"kārapesi"]);
DinfN.push(["karoti",1,"kārāpesi",1,65535,1,"s",4,4,"kārāpayiṃ"]);
DinfN.push(["karoti",1,"kārāpeti",1,65535,3,"s",0,1,"kārāpeti"]);
DinfN.push(["karoti",1,"kārāpeti",1,65535,3,"s",0,2,"kārāpayati"]);
DinfN.push(["karoti",1,"kārāpeti",1,65535,3,"pl",1,1,"kārāpenti"]);
DinfN.push(["karoti",1,"kārāpeti",1,65535,2,"pl",3,1,"kārāpetha"]);
DinfN.push(["karoti",1,"kārāpiyati",1,65535,3,"s",0,1,"kārāpiyati"]);
DinfN.push(["karoti",1,"karīyati",1,65535,3,"s",0,1,"kariyati"]);
DinfN.push(["karoti",1,"karīyati",1,65535,3,"s",0,2,"karīyati"]);
DinfN.push(["karoti",1,"karīyati",1,65535,3,"s",0,3,"karīyate"]);
DinfN.push(["karoti",1,"karīyati",1,65535,3,"s",0,4,"kariyyati"]);
DinfN.push(["karoti",1,"karīyati",1,65535,3,"s",0,5,"kariyyate"]);
DinfN.push(["karoti",1,"karīyati",1,65535,3,"s",0,6,"kayirati"]);
DinfN.push(["karoti",1,"karīyati",1,65535,3,"s",0,7,"kīrati"]);
DinfN.push(["karoti",1,"karīyati",1,65535,3,"s",0,8,"kayyati"]);
DinfN.push(["karoti",1,"karīyati",1,65535,3,"s",0,9,"kayyate"]);
DinfN.push(["karoti",1,"karīyati",1,65535,3,"pl",1,1,"karīyanti"]);
DinfN.push(["karoti",1,"karīyati",1,65535,3,"pl",1,2,"kayiranti"]);
DinfN.push(["karoti",1,"karīyati",1,65535,3,"pl",1,3,"kīranti"]);
DinfN.push(["karoti",1,"karīyati",1,65535,3,"pl",1,4,"(kariyanti)"]);
DinfN.push(["karoti",1,"karīyi",1,65535,3,"s",0,1,"karīyi"]);
DinfN.push(["karoti",1,"kāresi",1,65535,3,"s",0,1,"akāresi"]);
DinfN.push(["karoti",1,"kāresi",1,65535,3,"s",0,2,"kāresi"]);
DinfN.push(["karoti",1,"kāresi",1,65535,3,"s",0,3,"akārayi"]);
DinfN.push(["karoti",1,"kāresi",1,65535,3,"s",0,4,"kārayi"]);
DinfN.push(["karoti",1,"kāresi",1,65535,3,"pl",1,1,"kāresuṃ"]);
DinfN.push(["karoti",1,"kāresi",1,65535,3,"pl",1,2,"kārayiṃsu"]);
DinfN.push(["karoti",1,"kāresi",1,65535,3,"pl",1,3,"akārayuṃ"]);
DinfN.push(["karoti",1,"kāresi",1,65535,3,"pl",1,4,"kārayuṃ"]);
DinfN.push(["karoti",1,"kāresi",1,65535,2,"s",2,1,"kāresi"]);
DinfN.push(["karoti",1,"kāresi",1,65535,2,"s",2,2,"kārayesi"]);
DinfN.push(["karoti",1,"kāresi",1,65535,1,"s",4,1,"kāresiṃ"]);
DinfN.push(["karoti",1,"kāresi",1,65535,1,"s",4,2,"akārayiṃ"]);
DinfN.push(["karoti",1,"kāresi",1,65535,1,"s",4,3,"kārayiṃ"]);
DinfN.push(["karoti",1,"kāresi",1,65535,1,"s",4,4,"kārayesiṃ"]);
DinfN.push(["karoti",1,"kāresi",1,65535,1,"s",4,5,"akārayi"]);
DinfN.push(["karoti",1,"kāresi",1,65535,1,"s",4,6,"kārayi"]);
DinfN.push(["karoti",1,"kāreti",1,65535,3,"s",0,1,"kāreti"]);
DinfN.push(["karoti",1,"kāreti",1,65535,3,"s",0,2,"kārayati"]);
DinfN.push(["karoti",1,"kāreti",1,65535,3,"s",0,3,"kārayate"]);
DinfN.push(["karoti",1,"kāreti",1,65535,3,"pl",1,1,"kārenti"]);
DinfN.push(["karoti",1,"kāreti",1,65535,2,"pl",3,1,"kāretha"]);
DinfN.push(["karoti",1,"kāreti",1,65535,1,"s",4,1,"kāremi"]);
DinfN.push(["karoti",1,"kāreti",1,65535,1,"s",4,2,"kārayāmi"]);
DinfN.push(["karoti",1,"kari",1,65535,3,"s",0,1,"karī"]);
DinfN.push(["karoti",1,"kari",1,65535,3,"pl",1,1,"kariṃsu"]);
DinfN.push(["karoti",1,"kari",1,65535,3,"pl",1,2,"karuṃ"]);
DinfN.push(["karoti",1,"kari",1,65535,2,"s",2,1,"karī"]);
DinfN.push(["karoti",1,"kari",1,65535,2,"s",2,2,"kari"]);
DinfN.push(["karoti",1,"kari",1,65535,2,"pl",3,1,"karittha"]);
DinfN.push(["karoti",1,"kari",1,65535,1,"s",4,1,"kariṃ"]);
DinfN.push(["karoti",1,"kari",1,65535,1,"pl",5,1,"karimha"]);
DinfN.push(["karoti",1,"kari",1,65535,1,"pl",5,2,"karimhā"]);
DinfN.push(["karoti",1,"karissati",1,65535,3,"s",0,1,"karissati"]);
DinfN.push(["karoti",1,"karissati",1,65535,3,"s",0,2,"kāhati"]);
DinfN.push(["karoti",1,"karissati",1,65535,3,"s",0,3,"kāhiti"]);
DinfN.push(["karoti",1,"karissati",1,65535,3,"s",0,4,"kāsati"]);
DinfN.push(["karoti",1,"karissati",1,65535,3,"pl",1,1,"karissanti"]);
DinfN.push(["karoti",1,"karissati",1,65535,3,"pl",1,2,"kāhanti"]);
DinfN.push(["karoti",1,"karissati",1,65535,3,"pl",1,3,"kāhinti"]);
DinfN.push(["karoti",1,"karissati",1,65535,3,"pl",1,4,"karissare"]);
DinfN.push(["karoti",1,"karissati",1,65535,2,"s",2,1,"karissasi"]);
DinfN.push(["karoti",1,"karissati",1,65535,2,"s",2,2,"kāhasi"]);
DinfN.push(["karoti",1,"karissati",1,65535,2,"s",2,3,"kāhisi"]);
DinfN.push(["karoti",1,"karissati",1,65535,2,"pl",3,1,"karissatha"]);
DinfN.push(["karoti",1,"karissati",1,65535,2,"pl",3,2,"kāhatha"]);
DinfN.push(["karoti",1,"karissati",1,65535,1,"s",4,1,"karissāmi"]);
DinfN.push(["karoti",1,"karissati",1,65535,1,"s",4,2,"kāhāmi"]);
DinfN.push(["karoti",1,"karissati",1,65535,1,"s",4,3,"karissaṃ"]);
DinfN.push(["karoti",1,"karissati",1,65535,1,"s",4,4,"kassāmi"]);
DinfN.push(["karoti",1,"karissati",1,65535,1,"s",4,5,"kassaṃ"]);
DinfN.push(["karoti",1,"karissati",1,65535,1,"s",4,6,"kāsaṃ"]);
DinfN.push(["karoti",1,"karissati",1,65535,1,"pl",5,1,"karissāma"]);
DinfN.push(["karoti",1,"karissati",1,65535,1,"pl",5,2,"kāhāma"]);
DinfN.push(["karoti",1,"karissati",1,65535,1,"pl",5,3,"kassāma"]);
DinfN.push(["karoti",1,"karoti",1,65535,3,"s",0,1,"karoti"]);
DinfN.push(["karoti",1,"karoti",1,65535,3,"s",0,2,"kayirati"]);
DinfN.push(["karoti",1,"karoti",1,65535,3,"pl",1,1,"karonti"]);
DinfN.push(["karoti",1,"karoti",1,65535,2,"s",2,1,"karosi"]);
DinfN.push(["karoti",1,"karoti",1,65535,2,"pl",3,1,"karotha"]);
DinfN.push(["karoti",1,"karoti",1,65535,1,"s",4,1,"karomi"]);
DinfN.push(["karoti",1,"karoti",1,65535,1,"s",4,2,"kummi"]);
DinfN.push(["karoti",1,"karoti",1,65535,1,"pl",5,1,"karoma"]);
DinfN.push(["karoti",1,"kayirā",1,65535,3,"s",0,1,"kareyya"]);
DinfN.push(["karoti",1,"kayirā",1,65535,3,"s",0,2,"kare"]);
DinfN.push(["karoti",1,"kayirā",1,65535,3,"s",0,3,"kariyā"]);
DinfN.push(["karoti",1,"kayirā",1,65535,3,"s",0,4,"kuriyā"]);
DinfN.push(["karoti",1,"kayirā",1,65535,3,"s",0,5,"kuyirā"]);
DinfN.push(["karoti",1,"kayirā",1,65535,3,"s",0,6,"kayirātha"]);
DinfN.push(["karoti",1,"kayirā",1,65535,3,"s",0,7,"kayirā"]);
DinfN.push(["karoti",1,"kayirā",1,65535,3,"s",0,8,"(kayira)"]);
DinfN.push(["karoti",1,"kayirā",1,65535,3,"pl",1,1,"kareyyuṃ"]);
DinfN.push(["karoti",1,"kayirā",1,65535,3,"pl",1,2,"kare"]);
DinfN.push(["karoti",1,"kayirā",1,65535,3,"pl",1,3,"kayiruṃ"]);
DinfN.push(["karoti",1,"kayirā",1,65535,2,"s",2,1,"kareyyāsi"]);
DinfN.push(["karoti",1,"kayirā",1,65535,2,"s",2,2,"kare"]);
DinfN.push(["karoti",1,"kayirā",1,65535,2,"s",2,3,"kayirāsi"]);
DinfN.push(["karoti",1,"kayirā",1,65535,2,"s",2,4,"kayirā"]);
DinfN.push(["karoti",1,"kayirā",1,65535,2,"pl",3,1,"kareyyātha"]);
DinfN.push(["karoti",1,"kayirā",1,65535,2,"pl",3,2,"kayirātha"]);
DinfN.push(["karoti",1,"kayirā",1,65535,1,"s",4,1,"kareyyaṃ"]);
DinfN.push(["karoti",1,"kayirā",1,65535,1,"s",4,2,"kare"]);
DinfN.push(["karoti",1,"kayirā",1,65535,1,"s",4,3,"kareyyāmi"]);
DinfN.push(["karoti",1,"kayirā",1,65535,1,"pl",5,1,"kareyyāma"]);
DinfN.push(["karoti",1,"kubbati",1,65535,3,"s",0,1,"kubbati"]);
DinfN.push(["karoti",1,"kubbati",1,65535,3,"s",0,2,"kurute"]);
DinfN.push(["karoti",1,"kubbati",1,65535,3,"pl",1,1,"kubbanti"]);
DinfN.push(["karoti",1,"",,1,3,"s",0,1,"karotu"]);
DinfN.push(["karoti",1,"",,1,3,"s",0,2,"kurutu"]);
DinfN.push(["karoti",1,"",,1,3,"pl",1,1,"karontu"]);
DinfN.push(["karoti",1,"",,1,2,"s",2,1,"karohi"]);
DinfN.push(["karoti",1,"",,1,2,"s",2,2,"kuru"]);
DinfN.push(["karoti",1,"",,1,2,"pl",3,1,"karotha"]);
DinfN.push(["karoti",1,"",,1,1,"s",4,1,"karomi"]);
DinfN.push(["karoti",1,"",,1,1,"pl",5,1,"karoma"]);
DinfN.push(["karoti",1,"",,7,3,"s",0,1,"kariyatu"]);
DinfN.push(["karoti",1,"",,7,3,"s",0,2,"kayiratu"]);
DinfN.push(["karoti",1,"",,13,3,"s",0,1,"kurutaṃ"]);
DinfN.push(["karoti",1,"",,13,2,"s",2,1,"karassu"]);
DinfN.push(["karoti",1,"",,13,2,"pl",3,1,"kuruvho"]);
DinfN.push(["karoti",1,"",,13,1,"pl",5,1,"karomase"]);
DinfN.push(["karoti",1,"",,16,3,"s",0,1,"kubbetha"]);
DinfN.push(["karoti",1,"",,16,3,"s",0,2,"kubbaye"]);
DinfN.push(["karoti",1,"",,19,3,"s",0,1,"kāretu"]);
DinfN.push(["karoti",1,"",,19,2,"s",2,1,"kārehi"]);
DinfN.push(["karoti",1,"",,19,2,"s",2,2,"kārāpehi"]);
DinfN.push(["karoti",1,"",,22,3,"s",0,1,"kāreya"]);
DinfN.push(["karoti",1,"",,22,3,"s",0,2,"kāreyya"]);
DinfN.push(["karoti",1,"",,22,3,"s",0,3,"kārayeyya"]);
DinfN.push(["karoti",1,"",,22,3,"s",0,4,"kārāpeyya"]);
DinfN.push(["karoti",1,"",,22,3,"pl",1,1,"kāreyyuṃ"]);
DinfN.push(["karoti",1,"",,22,2,"s",2,1,"kārāpeyyāsi"]);
DinfN.push(["karoti",1,"",,22,2,"pl",3,1,"kārāpeyyātha"]);
DinfN.push(["karoti",1,"",,22,1,"s",4,1,"kāreya"]);
DinfN.push(["karoti",1,"",,22,1,"s",4,2,"kārāpeyyaṃ"]);
DinfN.push(["karoti",1,"",,22,1,"pl",5,1,"kāreyyāma"]);
DinfN.push(["labhati",1,"labhati",1,65535,3,"s",0,1,"labhati"]);
DinfN.push(["labhati",1,"labhati",1,65535,3,"pl",1,1,"labhanti"]);
DinfN.push(["labhati",1,"labhati",1,65535,2,"s",2,1,"labhasi"]);
DinfN.push(["labhati",1,"labhati",1,65535,2,"pl",3,1,"labhatha"]);
DinfN.push(["labhati",1,"labhati",1,65535,1,"s",4,1,"labhāmi"]);
DinfN.push(["labhati",1,"labhati",1,65535,1,"pl",5,1,"labhāma"]);
DinfN.push(["labhati",1,"",,1,3,"s",0,1,"labhatu"]);
DinfN.push(["labhati",1,"",,1,3,"pl",1,1,"labhantu"]);
DinfN.push(["labhati",1,"",,1,2,"s",2,1,"labha"]);
DinfN.push(["labhati",1,"",,1,2,"pl",3,1,"labhatha"]);
DinfN.push(["labhati",1,"",,1,1,"s",4,1,"labhāmi"]);
DinfN.push(["labhati",1,"",,1,1,"pl",5,1,"labhāma"]);
DinfN.push(["labhati",1,"",,4,3,"s",0,1,"labheyya"]);
DinfN.push(["labhati",1,"",,4,3,"s",0,2,"labhe"]);
DinfN.push(["labhati",1,"",,4,3,"pl",1,1,"labheyyuṃ"]);
DinfN.push(["labhati",1,"",,4,2,"s",2,1,"labheyyāsi"]);
DinfN.push(["labhati",1,"",,4,2,"pl",3,1,"labheyyātha"]);
DinfN.push(["labhati",1,"",,4,1,"s",4,1,"labheyyaṃ"]);
DinfN.push(["labhati",1,"",,4,1,"pl",5,1,"labheyyāma"]);
DinfN.push(["labhati",1,"",,12,3,"s",0,1,"labhate"]);
DinfN.push(["labhati",1,"",,12,3,"pl",1,1,"labhare"]);
DinfN.push(["labhati",1,"",,12,2,"s",2,1,"labhase"]);
DinfN.push(["labhati",1,"",,12,1,"s",4,1,"labhe"]);
DinfN.push(["labhati",1,"",,13,3,"s",0,1,"labhataṃ"]);
DinfN.push(["labhati",1,"",,13,2,"s",2,1,"labhassu"]);
DinfN.push(["labhati",1,"",,13,1,"pl",5,1,"labhāmase"]);
DinfN.push(["labhati",1,"",,13,1,"pl",5,2,"labhāmhase"]);
DinfN.push(["labhati",1,"",,16,3,"s",0,1,"labhetha"]);
DinfN.push(["labhati",1,"",,16,2,"s",2,1,"labhetho"]);
DinfN.push(["labhi",1,"labhi",1,65535,3,"s",0,1,"alattha"]);
DinfN.push(["labhi",1,"labhi",1,65535,3,"s",0,2,"labhi"]);
DinfN.push(["labhi",1,"labhi",1,65535,3,"s",0,3,"alabhi"]);
DinfN.push(["labhi",1,"labhi",1,65535,3,"s",0,4,"alabbhittha"]);
DinfN.push(["labhi",1,"labhi",1,65535,3,"pl",1,1,"alatthuṃ"]);
DinfN.push(["labhi",1,"labhi",1,65535,3,"pl",1,2,"alabhiṃsu"]);
DinfN.push(["labhi",1,"labhi",1,65535,3,"pl",1,3,"labhiṃsu"]);
DinfN.push(["labhi",1,"labhi",1,65535,3,"pl",1,4,"alatthaṃsu"]);
DinfN.push(["labhi",1,"labhi",1,65535,2,"s",2,1,"alattha"]);
DinfN.push(["labhi",1,"labhi",1,65535,2,"pl",3,1,"labhittha"]);
DinfN.push(["labhi",1,"labhi",1,65535,1,"s",4,1,"alatthaṃ"]);
DinfN.push(["labhi",1,"labhi",1,65535,1,"s",4,2,"alabhiṃ"]);
DinfN.push(["labhi",1,"labhi",1,65535,1,"s",4,3,"labhiṃ"]);
DinfN.push(["labhi",1,"labhi",1,65535,1,"s",4,4,"alabhitthaṃ"]);
DinfN.push(["labhi",1,"labhi",1,65535,1,"pl",5,1,"labhimhā"]);
DinfN.push(["labhi",1,"labhi",1,65535,1,"pl",5,2,"alatthamha"]);
DinfN.push(["paccanubhoti",1,"paccanubhoti",1,65535,3,"s",0,1,"paccanubhoti"]);
DinfN.push(["paccanubhoti",1,"paccanubhoti",1,65535,3,"pl",1,1,"paccanubhonti"]);
DinfN.push(["paccanubhoti",1,"paccanubhoti",1,65535,2,"s",2,1,"paccanubhosi"]);
DinfN.push(["paccanubhoti",1,"paccanubhoti",1,65535,2,"pl",3,1,"paccanubhotha"]);
DinfN.push(["paccanubhoti",1,"paccanubhoti",1,65535,1,"s",4,1,"paccanubhomi"]);
DinfN.push(["paccanubhoti",1,"paccanubhoti",1,65535,1,"pl",5,1,"paccanubhoma"]);
DinfN.push(["paccuṭṭhāti",1,"paccuṭṭhāti",1,65535,3,"s",0,1,"paccuṭṭhāti"]);
DinfN.push(["paccuṭṭhāti",1,"paccuṭṭhāti",1,65535,3,"pl",1,1,"paccuṭṭhanti"]);
DinfN.push(["paccuṭṭhāti",1,"paccuṭṭhāti",1,65535,2,"s",2,1,"paccuṭṭhāsi"]);
DinfN.push(["paccuṭṭhāti",1,"paccuṭṭhāti",1,65535,2,"pl",3,1,"paccuṭṭhātha"]);
DinfN.push(["paccuṭṭhāti",1,"paccuṭṭhāti",1,65535,1,"s",4,1,"paccuṭṭhāmi"]);
DinfN.push(["paccuṭṭhāti",1,"paccuṭṭhāti",1,65535,1,"pl",5,1,"paccuṭṭhāma"]);
DinfN.push(["paccuṭṭhāti",1,"",,1,3,"s",0,1,"paccuṭṭhātu"]);
DinfN.push(["paccuṭṭhāti",1,"",,1,3,"pl",1,1,"paccuṭṭhantu"]);
DinfN.push(["paccuṭṭhāti",1,"",,1,2,"s",2,1,"paccuṭṭhāhi"]);
DinfN.push(["paccuṭṭhāti",1,"",,1,2,"pl",3,1,"paccuṭṭhātha"]);
DinfN.push(["paccuṭṭhāti",1,"",,1,1,"s",4,1,"paccuṭṭhāmi"]);
DinfN.push(["paccuṭṭhāti",1,"",,1,1,"pl",5,1,"paccuṭṭhāma"]);
DinfN.push(["paccuṭṭhāti",1,"",,4,3,"s",0,1,"paccuṭṭheyya"]);
DinfN.push(["paccuṭṭhāti",1,"",,4,3,"pl",1,1,"paccuṭṭheyyuṃ"]);
DinfN.push(["paccuṭṭhāti",1,"",,4,2,"s",2,1,"paccuṭṭheyyāsi"]);
DinfN.push(["paccuṭṭhāti",1,"",,4,2,"pl",3,1,"paccuṭṭheyyātha"]);
DinfN.push(["paccuṭṭhāti",1,"",,4,1,"s",4,1,"paccuṭṭheyyaṃ"]);
DinfN.push(["paccuṭṭhāti",1,"",,4,1,"s",4,2,"paccuṭṭheyyāmi"]);
DinfN.push(["paccuṭṭhāti",1,"",,4,1,"pl",5,1,"paccuṭṭheyyāma"]);
DinfN.push(["paccupaṭṭhāti",1,"paccupaṭṭhāti",1,65535,3,"s",0,1,"paccupaṭṭhāti"]);
DinfN.push(["paccupaṭṭhāti",1,"paccupaṭṭhāti",1,65535,2,"s",2,1,"paccupaṭṭhāsi"]);
DinfN.push(["pahoti",1,"pahoti",1,65535,3,"s",0,1,"pahoti"]);
DinfN.push(["pahoti",1,"pahoti",1,65535,3,"pl",1,1,"pahonti"]);
DinfN.push(["pahoti",1,"pahoti",1,65535,2,"s",2,1,"pahosi"]);
DinfN.push(["pahoti",1,"pahoti",1,65535,2,"pl",3,1,"pahotha"]);
DinfN.push(["pahoti",1,"pahoti",1,65535,1,"s",4,1,"pahomi"]);
DinfN.push(["pahoti",1,"pahoti",1,65535,1,"pl",5,1,"pahoma"]);
DinfN.push(["pakkamati",1,"pakkāmi",1,65535,3,"s",0,1,"pakkāmi"]);
DinfN.push(["pakkamati",1,"pakkāmi",1,65535,3,"pl",1,1,"pakkamuṃ"]);
DinfN.push(["pakkamati",1,"pakkāmi",1,65535,3,"pl",1,2,"pakkamiṃsu"]);
DinfN.push(["paṭikaroti",1,"paṭikaroti",1,65535,3,"s",0,1,"paṭikaroti"]);
DinfN.push(["paṭikaroti",1,"paṭikaroti",1,65535,3,"pl",1,1,"paṭikaronti"]);
DinfN.push(["paṭikaroti",1,"paṭikaroti",1,65535,2,"s",2,1,"paṭikarosi"]);
DinfN.push(["paṭikaroti",1,"paṭikaroti",1,65535,2,"pl",3,1,"paṭikarotha"]);
DinfN.push(["paṭikaroti",1,"paṭikaroti",1,65535,1,"s",4,1,"paṭikaromi"]);
DinfN.push(["paṭikaroti",1,"paṭikaroti",1,65535,1,"pl",5,1,"paṭikaroma"]);
DinfN.push(["paṭikaroti",1,"",,1,3,"s",0,1,"paṭikarotu"]);
DinfN.push(["paṭikaroti",1,"",,1,3,"pl",1,1,"paṭikarontu"]);
DinfN.push(["paṭikaroti",1,"",,1,2,"s",2,1,"paṭikarohi"]);
DinfN.push(["paṭikaroti",1,"",,1,2,"pl",3,1,"paṭikarotha"]);
DinfN.push(["paṭikaroti",1,"",,1,1,"s",4,1,"paṭikaromi"]);
DinfN.push(["paṭikaroti",1,"",,1,1,"pl",5,1,"paṭikaroma"]);
DinfN.push(["paṭikaroti",1,"",,4,3,"s",0,1,"paṭikareyya"]);
DinfN.push(["paṭikaroti",1,"",,4,3,"pl",1,1,"paṭikareyyuṃ"]);
DinfN.push(["paṭikaroti",1,"",,4,2,"s",2,1,"paṭikareyyāsi"]);
DinfN.push(["paṭikaroti",1,"",,4,2,"pl",3,1,"paṭikareyyātha"]);
DinfN.push(["paṭikaroti",1,"",,4,1,"s",4,1,"paṭikareyyaṃ"]);
DinfN.push(["paṭikaroti",1,"",,4,1,"pl",5,1,"paṭikareyyāma"]);
DinfN.push(["paṭissuṇāti",1,"paccassosi",1,65535,3,"s",0,1,"paccassosi"]);
DinfN.push(["paṭissuṇāti",1,"paccassosi",1,65535,3,"pl",1,1,"paccassosuṃ"]);
DinfN.push(["paṭissuṇāti",1,"paccassosi",1,65535,2,"s",2,1,"paccassosi"]);
DinfN.push(["paṭissuṇāti",1,"paccassosi",1,65535,2,"pl",3,1,"paccassuttha"]);
DinfN.push(["paṭissuṇāti",1,"paccassosi",1,65535,1,"s",4,1,"paccassosiṃ"]);
DinfN.push(["paṭissuṇāti",1,"paccassosi",1,65535,1,"pl",5,1,"paccassumha"]);
DinfN.push(["pappoti",1,"pappoti",1,65535,3,"s",0,1,"pappoti"]);
DinfN.push(["pappoti",1,"pappoti",1,65535,3,"pl",1,1,"papponti"]);
DinfN.push(["pappoti",1,"pappoti",1,65535,2,"s",2,1,"papposi"]);
DinfN.push(["pappoti",1,"pappoti",1,65535,2,"pl",3,1,"pappotha"]);
DinfN.push(["pappoti",1,"pappoti",1,65535,1,"s",4,1,"pappomi"]);
DinfN.push(["pappoti",1,"pappoti",1,65535,1,"pl",5,1,"pappoma"]);
DinfN.push(["pappoti",1,"",,1,3,"s",0,1,"pappotu"]);
DinfN.push(["pappoti",1,"",,1,3,"pl",1,1,"pappontu"]);
DinfN.push(["pappoti",1,"",,1,2,"s",2,1,"pappohi"]);
DinfN.push(["pappoti",1,"",,1,2,"pl",3,1,"pappotha"]);
DinfN.push(["pappoti",1,"",,1,1,"s",4,1,"pappomi"]);
DinfN.push(["pappoti",1,"",,1,1,"pl",5,1,"pappoma"]);
DinfN.push(["pappoti",1,"",,4,3,"s",0,1,"<no 3rd sng form>"]);
DinfN.push(["pappoti",1,"",,4,1,"pl",5,1,"pappomu"]);
DinfN.push(["pāpuṇāti",1,"pāpuṇāti",1,65535,3,"s",0,1,"pāpuṇāti"]);
DinfN.push(["pāpuṇāti",1,"pāpuṇāti",1,65535,3,"pl",1,1,"pāpuṇanti"]);
DinfN.push(["pāpuṇāti",1,"pāpuṇāti",1,65535,2,"s",2,1,"pāpuṇāsi"]);
DinfN.push(["pāpuṇāti",1,"pāpuṇāti",1,65535,2,"pl",3,1,"pāpuṇātha"]);
DinfN.push(["pāpuṇāti",1,"pāpuṇāti",1,65535,1,"s",4,1,"pāpuṇāmi"]);
DinfN.push(["pāpuṇāti",1,"pāpuṇāti",1,65535,1,"pl",5,1,"pāpuṇāma"]);
DinfN.push(["pāpuṇāti",1,"",,4,3,"s",0,1,"pāpuṇeyya"]);
DinfN.push(["pāpuṇāti",1,"",,4,3,"s",0,2,"pāpuṇe"]);
DinfN.push(["pāpuṇāti",1,"",,4,1,"pl",5,1,"pāpuṇeyyāma"]);
DinfN.push(["pariyādāti",1,"pariyādāti",1,65535,3,"s",0,1,"<no active forms>"]);
DinfN.push(["patiṭṭhahati",1,"patiṭṭhahati",1,65535,3,"s",0,1,"patiṭṭhahati"]);
DinfN.push(["patiṭṭhahati",1,"patiṭṭhahati",1,65535,3,"pl",1,1,"patiṭṭhahanti"]);
DinfN.push(["patiṭṭhahati",1,"patiṭṭhahati",1,65535,2,"s",2,1,"patiṭṭhahasi"]);
DinfN.push(["patiṭṭhahati",1,"patiṭṭhahati",1,65535,2,"pl",3,1,"patiṭṭhahatha"]);
DinfN.push(["patiṭṭhahati",1,"patiṭṭhahati",1,65535,1,"s",4,1,"patiṭṭhahāmi"]);
DinfN.push(["patiṭṭhahati",1,"patiṭṭhahati",1,65535,1,"pl",5,1,"patiṭṭhahāma"]);
DinfN.push(["patiṭṭhahati",1,"patiṭṭhāti",1,65535,3,"s",0,1,"patiṭṭhāti"]);
DinfN.push(["patiṭṭhahati",1,"patiṭṭhāti",1,65535,3,"pl",1,1,"patiṭṭhanti"]);
DinfN.push(["patiṭṭhahati",1,"patiṭṭhāti",1,65535,2,"s",2,1,"patiṭṭhāsi"]);
DinfN.push(["patiṭṭhahati",1,"patiṭṭhāti",1,65535,2,"pl",3,1,"patiṭṭhātha"]);
DinfN.push(["patiṭṭhahati",1,"patiṭṭhāti",1,65535,1,"s",4,1,"patiṭṭhahāmi"]);
DinfN.push(["patiṭṭhahati",1,"patiṭṭhāti",1,65535,1,"pl",5,1,"patiṭṭhahāma"]);
DinfN.push(["patiṭṭhahati",1,"",,1,3,"s",0,1,"patiṭṭhātu"]);
DinfN.push(["patiṭṭhahati",1,"",,1,3,"pl",1,1,"patiṭṭhantu"]);
DinfN.push(["patiṭṭhahati",1,"",,1,2,"s",2,1,"patiṭṭhāhi"]);
DinfN.push(["patiṭṭhahati",1,"",,1,2,"pl",3,1,"patiṭṭhātha"]);
DinfN.push(["patiṭṭhahati",1,"",,1,1,"s",4,1,"patiṭṭhahāmi"]);
DinfN.push(["patiṭṭhahati",1,"",,1,1,"pl",5,1,"patiṭṭhahāma"]);
DinfN.push(["patiṭṭhahati",1,"",,4,3,"s",0,1,"patiṭṭhaheyya"]);
DinfN.push(["patiṭṭhahati",1,"",,4,3,"pl",1,1,"patiṭṭhaheyyuṃ"]);
DinfN.push(["patiṭṭhahati",1,"",,4,2,"s",2,1,"patiṭṭhaheyyāsi"]);
DinfN.push(["patiṭṭhahati",1,"",,4,2,"pl",3,1,"patiṭṭhaheyyātha"]);
DinfN.push(["patiṭṭhahati",1,"",,4,1,"s",4,1,"patiṭṭhaheyyaṃ"]);
DinfN.push(["patiṭṭhahati",1,"",,4,1,"pl",5,1,"patiṭṭhaheyyāmi"]);
DinfN.push(["pātubhavati",1,"pāturahosi",1,65535,3,"s",0,1,"pāturahosi"]);
DinfN.push(["pātubhavati",1,"pāturahosi",1,65535,3,"pl",1,1,"pāturahaṃsu"]);
DinfN.push(["pātubhavati",1,"pāturahosi",1,65535,3,"pl",1,2,"pāturahiṃsu"]);
DinfN.push(["pātubhavati",1,"pāturahosi",1,65535,2,"s",2,1,"pāturahosi"]);
DinfN.push(["pātubhavati",1,"pāturahosi",1,65535,2,"pl",3,1,"pāturahuvattha"]);
DinfN.push(["pātubhavati",1,"pāturahosi",1,65535,1,"s",4,1,"pāturahosiṃ"]);
DinfN.push(["pātubhavati",1,"pāturahosi",1,65535,1,"pl",5,1,"pāturahumha"]);
DinfN.push(["purakkharoti",1,"purakkharoti",1,65535,3,"s",0,1,"<no present forms>"]);
DinfN.push(["sakkoti",1,"sakkoti",1,65535,3,"s",0,1,"sakkoti"]);
DinfN.push(["sakkoti",1,"sakkoti",1,65535,3,"pl",1,1,"sakkonti"]);
DinfN.push(["sakkoti",1,"sakkoti",1,65535,2,"s",2,1,"sakkosi"]);
DinfN.push(["sakkoti",1,"sakkoti",1,65535,2,"pl",3,1,"sakkotha"]);
DinfN.push(["sakkoti",1,"sakkoti",1,65535,1,"s",4,1,"sakkomi"]);
DinfN.push(["sakkoti",1,"sakkoti",1,65535,1,"pl",5,1,"sakkoma"]);
DinfN.push(["sakkoti",1,"",,4,3,"s",0,1,"sakkuṇeyya"]);
DinfN.push(["sakkoti",1,"",,4,3,"pl",1,1,"sakkuṇeyyuṃ"]);
DinfN.push(["sakkoti",1,"",,4,2,"s",2,1,"sakkuṇeyyāsi"]);
DinfN.push(["sakkoti",1,"",,4,2,"pl",3,1,"sakkuṇeyyātha"]);
DinfN.push(["sakkoti",1,"",,4,1,"s",4,1,"sakkuṇeyyaṃ"]);
DinfN.push(["sakkoti",1,"",,4,1,"pl",5,1,"sakkuṇeyyāma"]);
DinfN.push(["sakkoti",1,"",,4,1,"pl",5,2,"sakkuṇemu"]);
DinfN.push(["samādāti",1,"samādāti",1,65535,3,"s",0,1,"<no active forms>"]);
DinfN.push(["sambhoti",1,"sambhoti",1,65535,3,"s",0,1,"sambhoti"]);
DinfN.push(["sambhoti",1,"sambhoti",1,65535,3,"pl",1,1,"sambhonti"]);
DinfN.push(["samudeti",1,"samudeti",1,65535,3,"s",0,1,"samudeti"]);
DinfN.push(["samudeti",1,"samudeti",1,65535,3,"s",0,2,"samudayati"]);
DinfN.push(["santiṭṭhati",1,"santiṭṭhati",1,65535,3,"s",0,1,"santiṭṭhati"]);
DinfN.push(["santiṭṭhati",1,"santiṭṭhati",1,65535,3,"pl",1,1,"santiṭṭhanti"]);
DinfN.push(["santiṭṭhati",1,"santiṭṭhati",1,65535,2,"s",2,1,"santiṭṭhasi"]);
DinfN.push(["santiṭṭhati",1,"santiṭṭhati",1,65535,2,"pl",3,1,"santiṭṭhatha"]);
DinfN.push(["santiṭṭhati",1,"santiṭṭhati",1,65535,1,"s",4,1,"santiṭṭhāmi"]);
DinfN.push(["santiṭṭhati",1,"santiṭṭhati",1,65535,1,"pl",5,1,"santiṭṭhāma"]);
DinfN.push(["santiṭṭhati",1,"saṇṭhāti",1,65535,3,"s",0,1,"saṇṭhāti"]);
DinfN.push(["santiṭṭhati",1,"saṇṭhāti",1,65535,3,"s",0,2,"saṇṭhahati"]);
DinfN.push(["santiṭṭhati",1,"saṇṭhāti",1,65535,3,"pl",1,1,"saṇṭhanti"]);
DinfN.push(["santiṭṭhati",1,"saṇṭhāti",1,65535,3,"pl",1,2,"saṇṭhahanti"]);
DinfN.push(["santiṭṭhati",1,"saṇṭhāti",1,65535,2,"s",2,1,"saṇṭhāsi"]);
DinfN.push(["santiṭṭhati",1,"saṇṭhāti",1,65535,2,"s",2,2,"saṇṭhahasi"]);
DinfN.push(["santiṭṭhati",1,"saṇṭhāti",1,65535,2,"pl",3,1,"saṇṭhātha"]);
DinfN.push(["santiṭṭhati",1,"saṇṭhāti",1,65535,2,"pl",3,2,"saṇṭhahatha"]);
DinfN.push(["santiṭṭhati",1,"saṇṭhāti",1,65535,1,"s",4,1,"saṇṭhāmi"]);
DinfN.push(["santiṭṭhati",1,"saṇṭhāti",1,65535,1,"s",4,2,"saṇṭhahāmi"]);
DinfN.push(["santiṭṭhati",1,"saṇṭhāti",1,65535,1,"pl",5,1,"saṇṭhāma"]);
DinfN.push(["santiṭṭhati",1,"saṇṭhāti",1,65535,1,"pl",5,2,"saṇṭhahāma"]);
DinfN.push(["santiṭṭhati",1,"",,4,3,"s",0,1,"saṇṭhaheyya"]);
DinfN.push(["seti",1,"sayati",1,65535,3,"s",0,1,"sayati"]);
DinfN.push(["seti",1,"sayati",1,65535,3,"pl",1,1,"sayanti"]);
DinfN.push(["seti",1,"sayati",1,65535,2,"s",2,1,"sayasi"]);
DinfN.push(["seti",1,"sayati",1,65535,2,"pl",3,1,"sayatha"]);
DinfN.push(["seti",1,"sayati",1,65535,1,"s",4,1,"sayāmi"]);
DinfN.push(["seti",1,"sayati",1,65535,1,"pl",5,1,"sayāma"]);
DinfN.push(["seti",1,"seti",1,65535,3,"s",0,1,"seti"]);
DinfN.push(["seti",1,"seti",1,65535,3,"pl",1,1,"senti"]);
DinfN.push(["seti",1,"seti",1,65535,2,"s",2,1,"sesi"]);
DinfN.push(["seti",1,"seti",1,65535,2,"pl",3,1,"setha"]);
DinfN.push(["seti",1,"seti",1,65535,1,"s",4,1,"semi"]);
DinfN.push(["seti",1,"seti",1,65535,1,"pl",5,1,"sema"]);
DinfN.push(["seti",1,"",,1,3,"s",0,1,"sayatu"]);
DinfN.push(["seti",1,"",,4,3,"s",0,1,"sayeyya"]);
DinfN.push(["seti",1,"",,4,3,"s",0,2,"saye"]);
DinfN.push(["seti",1,"",,4,2,"pl",3,1,"sayeyyātha"]);
DinfN.push(["suṇāti",1,"suṇāti",1,65535,3,"s",0,1,"suṇāti"]);
DinfN.push(["suṇāti",1,"suṇāti",1,65535,3,"s",0,2,"suṇoti"]);
DinfN.push(["suṇāti",1,"suṇāti",1,65535,3,"pl",1,1,"suṇanti"]);
DinfN.push(["suṇāti",1,"suṇāti",1,65535,2,"s",2,1,"suṇāsi"]);
DinfN.push(["suṇāti",1,"suṇāti",1,65535,2,"s",2,2,"suṇosi"]);
DinfN.push(["suṇāti",1,"suṇāti",1,65535,2,"pl",3,1,"suṇātha"]);
DinfN.push(["suṇāti",1,"suṇāti",1,65535,2,"pl",3,2,"suṇotha"]);
DinfN.push(["suṇāti",1,"suṇāti",1,65535,1,"s",4,1,"suṇāmi"]);
DinfN.push(["suṇāti",1,"suṇāti",1,65535,1,"s",4,2,"suṇomi"]);
DinfN.push(["suṇāti",1,"suṇāti",1,65535,1,"pl",5,1,"suṇoma"]);
DinfN.push(["suṇāti",1,"suṇāti",1,65535,1,"pl",5,2,"suṇāma"]);
DinfN.push(["suṇāti",1,"",,1,3,"s",0,1,"suṇātu"]);
DinfN.push(["suṇāti",1,"",,1,2,"s",2,1,"suṇohi"]);
DinfN.push(["suṇāti",1,"",,1,2,"s",2,2,"suṇāhi"]);
DinfN.push(["suṇāti",1,"",,4,3,"s",0,1,"suṇeyya"]);
DinfN.push(["suṇāti",1,"",,4,3,"pl",1,1,"suṇeyyuṃ"]);
DinfN.push(["suṇāti",1,"",,4,2,"pl",3,1,"suṇeyyātha"]);
DinfN.push(["suṇāti",1,"",,4,1,"s",4,1,"suṇeyyaṃ"]);
DinfN.push(["suṇāti",1,"",,4,1,"pl",5,1,"suṇeyyāma"]);
DinfN.push(["tiṭṭhati",1,"tiṭṭhati",1,65535,3,"s",0,1,"tiṭṭhati"]);
DinfN.push(["tiṭṭhati",1,"tiṭṭhati",1,65535,3,"pl",1,1,"tiṭṭhanti"]);
DinfN.push(["tiṭṭhati",1,"tiṭṭhati",1,65535,2,"s",2,1,"tiṭṭhasi"]);
DinfN.push(["tiṭṭhati",1,"tiṭṭhati",1,65535,2,"pl",3,1,"tiṭṭhatha"]);
DinfN.push(["tiṭṭhati",1,"tiṭṭhati",1,65535,1,"s",4,1,"tiṭṭhāmi"]);
DinfN.push(["tiṭṭhati",1,"tiṭṭhati",1,65535,1,"pl",5,1,"tiṭṭhāma"]);
DinfN.push(["tiṭṭhati",1,"",,1,3,"s",0,1,"tiṭṭhatu"]);
DinfN.push(["tiṭṭhati",1,"",,1,3,"pl",1,1,"tiṭṭhantu"]);
DinfN.push(["tiṭṭhati",1,"",,1,2,"s",2,1,"tiṭṭha"]);
DinfN.push(["tiṭṭhati",1,"",,1,2,"pl",3,1,"tiṭṭhatha"]);
DinfN.push(["tiṭṭhati",1,"",,1,1,"s",4,1,"tiṭṭhāmi"]);
DinfN.push(["tiṭṭhati",1,"",,1,1,"pl",5,1,"tiṭṭhāma"]);
DinfN.push(["tiṭṭhati",1,"",,4,3,"s",0,1,"tiṭṭhe"]);
DinfN.push(["tiṭṭhati",1,"",,4,3,"s",0,2,"tiṭṭheyya"]);
DinfN.push(["tiṭṭhati",1,"",,4,3,"pl",1,1,"tiṭṭheyyuṃ"]);
DinfN.push(["tiṭṭhati",1,"",,4,2,"s",2,1,"tiṭṭheyyāsi"]);
DinfN.push(["tiṭṭhati",1,"",,4,2,"pl",3,1,"tiṭṭheyyātha"]);
DinfN.push(["tiṭṭhati",1,"",,4,1,"s",4,1,"tiṭṭheyyaṃ"]);
DinfN.push(["tiṭṭhati",1,"",,4,1,"s",4,2,"tiṭṭheyyāmi"]);
DinfN.push(["tiṭṭhati",1,"",,4,1,"pl",5,1,"tiṭṭheyyāma"]);
DinfN.push(["udayati",1,"udayati",1,65535,3,"s",0,1,"udayati"]);
DinfN.push(["udayati",1,"udayati",1,65535,3,"pl",1,1,"udayanti"]);
DinfN.push(["udeti",1,"udeti",1,65535,3,"s",0,1,"udeti"]);
DinfN.push(["udeti",1,"udeti",1,65535,3,"pl",1,1,"udenti"]);
DinfN.push(["upaccagā",1,"upaccagā",1,65535,3,"s",0,1,"upaccagā"]);
DinfN.push(["upaccagā",1,"upaccagā",1,65535,3,"pl",1,1,"upaccaguṃ"]);
DinfN.push(["upaccagā",1,"upaccagā",1,65535,3,"pl",1,2,"upaccagu"]);
DinfN.push(["upaccagā",1,"upaccagā",1,65535,3,"pl",1,3,"upaccagū"]);
DinfN.push(["upaccagā",1,"upaccagā",1,65535,1,"s",4,1,"upaccagaṃ"]);
DinfN.push(["upāgāmi",1,"upāgāmi",1,65535,3,"s",0,1,"upāgamāsi"]);
DinfN.push(["upāgāmi",1,"upāgāmi",1,65535,3,"s",0,2,"upāgāmi"]);
DinfN.push(["upāgāmi",1,"upāgāmi",1,65535,3,"s",0,3,"upāgacchi"]);
DinfN.push(["upāgāmi",1,"upāgāmi",1,65535,3,"s",0,4,"upāgaṭchi"]);
DinfN.push(["upāgāmi",1,"upāgāmi",1,65535,3,"s",0,5,"upagacchi"]);
DinfN.push(["upāgāmi",1,"upāgāmi",1,65535,3,"s",0,6,"upagaṭchi"]);
DinfN.push(["upāgāmi",1,"upāgāmi",1,65535,3,"pl",1,1,"upāgamuṃ"]);
DinfN.push(["upāgāmi",1,"upāgāmi",1,65535,3,"pl",1,2,"upāgamiṃsu"]);
DinfN.push(["upāgāmi",1,"upāgāmi",1,65535,3,"pl",1,3,"upagamiṃsu"]);
DinfN.push(["upāgāmi",1,"upāgāmi",1,65535,3,"pl",1,4,"upāgaṭchuṃ"]);
DinfN.push(["upāgāmi",1,"upāgāmi",1,65535,3,"pl",1,5,"upagacchuṃ"]);
DinfN.push(["upāgāmi",1,"upāgāmi",1,65535,3,"pl",1,6,"upagaṭchuṃ"]);
DinfN.push(["upāgāmi",1,"upāgāmi",1,65535,3,"pl",1,7,"upagacchiṃsu"]);
DinfN.push(["upāgāmi",1,"upāgāmi",1,65535,3,"pl",1,8,"(upagacchu)"]);
DinfN.push(["upāgāmi",1,"upāgāmi",1,65535,3,"pl",1,9,"(upagaṭchu)"]);
DinfN.push(["upāgāmi",1,"upāgāmi",1,65535,1,"s",4,1,"upāgamaṃ"]);
DinfN.push(["upāgāmi",1,"upāgāmi",1,65535,1,"s",4,2,"upagamaṃ"]);
DinfN.push(["upāgāmi",1,"upāgāmi",1,65535,1,"s",4,3,"upāgamiṃ"]);
DinfN.push(["upāgāmi",1,"upāgāmi",1,65535,1,"s",4,4,"upagamiṃ"]);
DinfN.push(["upāgāmi",1,"upāgāmi",1,65535,1,"s",4,5,"upāgacchiṃ"]);
DinfN.push(["upāgāmi",1,"upāgāmi",1,65535,1,"s",4,6,"upāgaṭchiṃ"]);
DinfN.push(["upāgāmi",1,"upāgāmi",1,65535,1,"s",4,7,"upagacchiṃ"]);
DinfN.push(["upāgāmi",1,"upāgāmi",1,65535,1,"s",4,8,"upagaṭchiṃ"]);
DinfN.push(["upāgāmi",1,"",,14,3,"s",0,1,"upagacchittha"]);
DinfN.push(["upaṭṭhahati",1,"upaṭṭhahati",1,65535,3,"s",0,1,"upaṭṭhahati"]);
DinfN.push(["upaṭṭhahati",1,"upaṭṭhahati",1,65535,3,"s",0,2,"(upaṭṭhaheti)"]);
DinfN.push(["upaṭṭhahati",1,"upaṭṭhahati",1,65535,3,"pl",1,1,"upaṭṭhahanti"]);
DinfN.push(["upaṭṭhahati",1,"upaṭṭhahati",1,65535,2,"pl",3,1,"upaṭṭhahatha"]);
DinfN.push(["upaṭṭhahati",1,"upaṭṭhahati",1,65535,1,"s",4,1,"upaṭṭhahāmi"]);
DinfN.push(["upaṭṭhahati",1,"upaṭṭhahati",1,65535,1,"s",4,2,"upaṭṭhahema"]);
DinfN.push(["upaṭṭhahati",1,"",,1,3,"s",0,1,"upaṭṭhahatu"]);
DinfN.push(["upaṭṭhahati",1,"",,1,2,"s",2,1,"upaṭṭhaha"]);
DinfN.push(["upaṭṭhahati",1,"",,4,3,"s",0,1,"upaṭṭhaheyya"]);
DinfN.push(["upaṭṭhahati",1,"",,13,3,"s",0,1,"<no 3rd sing form>"]);
DinfN.push(["upaṭṭhahati",1,"",,13,2,"s",2,1,"upaṭṭhahassu"]);
DinfN.push(["upaṭṭhāti",1,"upaṭṭhāti",1,65535,3,"s",0,1,"upaṭṭhāti"]);
DinfN.push(["upaṭṭhāti",1,"upaṭṭhāti",1,65535,3,"s",0,2,"upaṭṭheti"]);
DinfN.push(["upaṭṭhāti",1,"upaṭṭhāti",1,65535,3,"pl",1,1,"upaṭṭhanti"]);
DinfN.push(["upaṭṭhāti",1,"upaṭṭhāti",1,65535,3,"pl",1,2,"upaṭṭhenti"]);
DinfN.push(["upaṭṭhāti",1,"upaṭṭhāti",1,65535,2,"s",2,1,"upaṭṭhesi"]);
DinfN.push(["upaṭṭhāti",1,"",,1,3,"s",0,1,"upaṭṭhātu"]);
DinfN.push(["upaṭṭhāti",1,"",,1,2,"s",2,1,"upaṭṭhāhi"]);
DinfN.push(["upaṭṭhāti",1,"",,4,3,"s",0,1,"upaṭṭheyya"]);
DinfN.push(["upātigacchati",1,"",,0,3,"s",0,1,"<no present forms>"]);
DinfN.push(["upatiṭṭhati",1,"upatiṭṭhati",1,65535,3,"s",0,1,"upatiṭṭhati"]);
DinfN.push(["upatiṭṭhati",1,"upatiṭṭhati",1,65535,3,"pl",1,1,"upatiṭṭhanti"]);
DinfN.push(["upatiṭṭhati",1,"upatiṭṭhati",1,65535,2,"pl",3,1,"upatiṭṭhatha"]);
DinfN.push(["upatiṭṭhati",1,"upatiṭṭhati",1,65535,1,"pl",5,1,"upatiṭṭhāma"]);
DinfN.push(["upatiṭṭhati",1,"",,1,3,"s",0,1,"upatiṭṭhatu"]);
DinfN.push(["upatiṭṭhati",1,"",,4,3,"s",0,1,"upatiṭṭheyya"]);
DinfN.push(["upatiṭṭhati",1,"",,4,3,"pl",1,1,"upatiṭṭheyyuṃ"]);
DinfN.push(["upatiṭṭhati",1,"",,4,1,"s",4,1,"upatiṭṭheyyaṃ"]);
DinfN.push(["vadati",1,"vadati",1,65535,3,"s",0,1,"vadati"]);
DinfN.push(["vadati",1,"vadati",1,65535,3,"pl",1,1,"vadanti"]);
DinfN.push(["vadati",1,"vadati",1,65535,2,"s",2,1,"vadasi"]);
DinfN.push(["vadati",1,"vadati",1,65535,2,"pl",3,1,"vadatha"]);
DinfN.push(["vadati",1,"vadati",1,65535,1,"s",4,1,"vadāmi"]);
DinfN.push(["vadati",1,"vadati",1,65535,1,"pl",5,1,"vadāma"]);
DinfN.push(["vadati",1,"",,2,3,"s",0,1,"<no 3rd sing form>"]);
DinfN.push(["vadati",1,"",,2,2,"s",2,1,"vadehi"]);
DinfN.push(["vadati",1,"",,16,3,"s",0,1,"<no 3rd sing form>"]);
DinfN.push(["vadati",1,"",,16,1,"pl",5,1,"vademase"]);
DinfN.push(["vajjā",1,"vajjā",1,65535,3,"s",0,1,"vadeyya"]);
DinfN.push(["vajjā",1,"vajjā",1,65535,3,"s",0,2,"vajjā"]);
DinfN.push(["vajjā",1,"vajjā",1,65535,3,"pl",1,1,"vadeyyuṃ"]);
DinfN.push(["vajjā",1,"vajjā",1,65535,3,"pl",1,2,"vajjuṃ"]);
DinfN.push(["vajjā",1,"vajjā",1,65535,2,"s",2,1,"vadeyyāsi"]);
DinfN.push(["vajjā",1,"vajjā",1,65535,2,"s",2,2,"vajjesi"]);
DinfN.push(["vajjā",1,"vajjā",1,65535,2,"s",2,3,"vajjāsi"]);
DinfN.push(["vajjā",1,"vajjā",1,65535,2,"pl",3,1,"vadeyyātha"]);
DinfN.push(["vajjā",1,"vajjā",1,65535,1,"s",4,1,"vade"]);
DinfN.push(["vajjā",1,"vajjā",1,65535,1,"s",4,2,"vadeyyaṃ"]);
DinfN.push(["vajjā",1,"vajjā",1,65535,1,"s",4,3,"(vadeyyāmi)"]);
DinfN.push(["vajjā",1,"vajjā",1,65535,1,"s",4,4,"vajjaṃ"]);
DinfN.push(["vajjā",1,"vajjā",1,65535,1,"pl",5,1,"vadeyyāma"]);
DinfN.push(["vandati",1,"vandati",1,65535,3,"s",0,1,"vandati"]);
DinfN.push(["vandati",1,"vandati",1,65535,3,"pl",1,1,"vandanti"]);
DinfN.push(["vandati",1,"vandati",1,65535,2,"s",2,1,"vandasi"]);
DinfN.push(["vandati",1,"vandati",1,65535,2,"pl",3,1,"vandatha"]);
DinfN.push(["vandati",1,"vandati",1,65535,1,"s",4,1,"vandāmi"]);
DinfN.push(["vandati",1,"vandati",1,65535,1,"pl",5,1,"vandāma"]);
DinfN.push(["vandati",1,"",,1,3,"s",0,1,"<no 3rd sing forms>"]);
DinfN.push(["vandati",1,"",,1,3,"pl",1,1,"vandantu"]);
DinfN.push(["vandati",1,"",,1,2,"s",2,1,"vanda"]);
DinfN.push(["vandati",1,"",,1,2,"s",2,2,"vandāhi"]);
DinfN.push(["vandati",1,"",,4,3,"s",0,1,"vandeyya"]);
DinfN.push(["vandati",1,"",,4,2,"s",2,1,"vandeyyāsi"]);
DinfN.push(["vandati",1,"",,12,3,"s",0,1,"vandate"]);
DinfN.push(["vandati",1,"",,12,2,"s",2,1,"vandase"]);
DinfN.push(["vandati",1,"",,12,1,"s",4,1,"vande"]);
DinfN.push(["viharati",1,"vihāsi",1,65535,3,"s",0,1,"vihāsi"]);
DinfN.push(["viharati",1,"vihāsi",1,65535,3,"pl",1,1,"vihiṃsu"]);
DinfN.push(["viharati",1,"vihāsi",1,65535,3,"pl",1,2,"vihaṃsu"]);
DinfN.push(["vijānāti",1,"vijānāti",1,65535,3,"s",0,1,"vijānāti"]);
DinfN.push(["vijānāti",1,"vijānāti",1,65535,3,"pl",1,1,"vijānanti"]);
DinfN.push(["vijānāti",1,"vijānāti",1,65535,2,"s",2,1,"vijānāsi"]);
DinfN.push(["vijānāti",1,"vijānāti",1,65535,2,"pl",3,1,"vijānātha"]);
DinfN.push(["vijānāti",1,"vijānāti",1,65535,1,"s",4,1,"vijānāmi"]);
DinfN.push(["vijānāti",1,"vijānāti",1,65535,1,"pl",5,1,"vijānāma"]);
DinfN.push(["vijānāti",1,"",,1,3,"s",0,1,"vijānātu"]);
DinfN.push(["vijānāti",1,"",,1,3,"pl",1,1,"vijānantu"]);
DinfN.push(["vijānāti",1,"",,1,2,"s",2,1,"vijāna"]);
DinfN.push(["vijānāti",1,"",,1,2,"s",2,2,"vijānāhi"]);
DinfN.push(["vijānāti",1,"",,1,2,"pl",3,1,"vijānātha"]);
DinfN.push(["vijānāti",1,"",,1,1,"s",4,1,"vijānāmi"]);
DinfN.push(["vijānāti",1,"",,1,1,"pl",5,1,"vijānāma"]);
DinfN.push(["vijānāti",1,"",,4,3,"s",0,1,"vijāneyya"]);
DinfN.push(["vijānāti",1,"",,4,3,"s",0,2,"vijaṭṭā"]);
DinfN.push(["vijānāti",1,"",,4,3,"pl",1,1,"vijāneyyuṃ"]);
DinfN.push(["vijānāti",1,"",,4,2,"s",2,1,"vijāneyyāsi"]);
DinfN.push(["vijānāti",1,"",,4,2,"pl",3,1,"vijāneyyātha"]);
DinfN.push(["vijānāti",1,"",,4,1,"s",4,1,"vijāneyyaṃ"]);
DinfN.push(["vijānāti",1,"",,4,1,"s",4,2,"vijaṭṭaṃ"]);
DinfN.push(["vijānāti",1,"",,4,1,"s",4,3,"vijāniyaṃ"]);
DinfN.push(["vijānāti",1,"",,4,1,"pl",5,1,"vijāneyyāma"]);
DinfN.push(["vijānāti",1,"",,13,3,"s",0,1,"vijānataṃ"]);
DinfN.push(["vineti",1,"vineti",1,65535,3,"s",0,1,"vineti"]);
DinfN.push(["vineti",1,"vineti",1,65535,3,"pl",1,1,"vinenti"]);
DinfN.push(["vineti",1,"vineti",1,65535,2,"s",2,1,"vinesi"]);
DinfN.push(["vineti",1,"vineti",1,65535,2,"pl",3,1,"vinetha"]);
DinfN.push(["vineti",1,"vineti",1,65535,1,"s",4,1,"vinemi"]);
DinfN.push(["vineti",1,"vineti",1,65535,1,"pl",5,1,"vinema"]);
DinfN.push(["vineti",1,"",,1,3,"s",0,1,"vinetu"]);
DinfN.push(["vineti",1,"",,1,2,"s",2,1,"vinaya"]);
DinfN.push(["vineti",1,"",,4,3,"s",0,1,"vineyya"]);
DinfN.push(["vineti",1,"",,4,3,"pl",1,1,"vineyyuṃ"]);
DinfN.push(["vineti",1,"",,4,2,"s",2,1,"vineyyāsi"]);
DinfN.push(["vineti",1,"",,4,2,"pl",3,1,"vineyyātha"]);
DinfN.push(["vineti",1,"",,4,1,"s",4,1,"vineyyaṃ"]);
DinfN.push(["vineti",1,"",,4,1,"pl",5,1,"vineyyāma"]);
DinfN.push(["vineti",1,"",,13,3,"s",0,1,"<no 3rd sng form>"]);
DinfN.push(["vineti",1,"",,13,2,"s",2,1,"vinayassu"]);
DinfN.push(["vineti",1,"",,16,3,"s",0,1,"vinayetha"]);
DinfN.push(["vuṭṭhahati",1,"vuṭṭhahati",1,65535,3,"s",0,1,"vuṭṭhahati"]);
DinfN.push(["vuṭṭhahati",1,"vuṭṭhahati",1,65535,3,"pl",1,1,"vuṭṭhahanti"]);
DinfN.push(["vuṭṭhahati",1,"vuṭṭhahati",1,65535,2,"s",2,1,"vuṭṭhahasi"]);
DinfN.push(["vuṭṭhahati",1,"vuṭṭhahati",1,65535,2,"pl",3,1,"vuṭṭhahatha"]);
DinfN.push(["vuṭṭhahati",1,"vuṭṭhahati",1,65535,1,"s",4,1,"vuṭṭhahāmi"]);
DinfN.push(["vuṭṭhahati",1,"vuṭṭhahati",1,65535,1,"pl",5,1,"vuṭṭhahāma"]);
DinfN.push(["vuṭṭhahati",1,"vuṭṭhāti",1,65535,3,"s",0,1,"vuṭṭhāti"]);
DinfN.push(["vuṭṭhahati",1,"vuṭṭhāti",1,65535,3,"pl",1,1,"vuṭṭhanti"]);
DinfN.push(["vuṭṭhahati",1,"vuṭṭhāti",1,65535,2,"s",2,1,"vuṭṭhāsi"]);
DinfN.push(["vuṭṭhahati",1,"vuṭṭhāti",1,65535,2,"pl",3,1,"vuṭṭhātha"]);
DinfN.push(["vuṭṭhahati",1,"vuṭṭhāti",1,65535,1,"s",4,1,"vuṭṭhāmi"]);
DinfN.push(["vuṭṭhahati",1,"vuṭṭhāti",1,65535,1,"pl",5,1,"vuṭṭhāma"]);
DinfN.push(["vuṭṭhahati",1,"",,3,3,"s",0,1,"vuṭṭhahissati"]);
DinfN.push(["vuṭṭhahati",1,"",,3,3,"pl",1,1,"vuṭṭhahissanti"]);
DinfN.push(["vuṭṭhahati",1,"",,3,2,"s",2,1,"vuṭṭhahissasi"]);
DinfN.push(["vuṭṭhahati",1,"",,3,2,"pl",3,1,"vuṭṭhahissatha"]);
DinfN.push(["vuṭṭhahati",1,"",,3,1,"s",4,1,"vuṭṭhahissāmi"]);
DinfN.push(["vuṭṭhahati",1,"",,3,1,"pl",5,1,"vuṭṭhahissāma"]);
DinfN.push(["vuṭṭhahati",1,"",,4,3,"s",0,1,"vuṭṭhaheyya"]);
DinfN.push(["vyantīhoti",1,"vyantīhoti",1,65535,3,"s",0,1,"byantīhoti"]);
DinfN.push(["cinteti",1,"cinteti",1,65535,3,"pl",1,1,"cintenti"]);
DinfN.push(["cinteti",1,"cinteti",1,65535,2,"pl",3,1,"cintetha"]);
DinfN.push(["cinteti",1,"cinteti",1,65535,3,"s",0,1,"cinteti"]);
DinfN.push(["cinteti",1,"cinteti",1,65535,2,"s",2,1,"cintesi"]);
DinfN.push(["cinteti",1,"cinteti",1,65535,1,"s",4,1,"cintemi"]);
DinfN.push(["cinteti",1,"cinteti",1,65535,1,"pl",5,1,"cintema"]);
DinfN.push(["hoti",1,"huveyya",1,65535,3,"s",0,1,"huveyya"]);



function noahq() {
	
	var relmul = [];
	var relatt = [];
	var reltik = [];

	document.getElementById('mafbc').innerHTML = '<table><tr><td><textarea id="rel1"></textarea></td><td><textarea id="rel2"></textarea></td><td><textarea id="rel3"></textarea></td></tr></table>';
	var fin = '';
	var relm = [];
	var rela = [];
	var relt = [];
	for (i in relmul) {
		if(relm[relmul[i]] || relmul[i] == '') continue;
		relm[relmul[i]] = 1;
		fin += "relm['"+relmul[i]+"'] = '"+relatt[i]+'#'+reltik[i]+"';\n";
	}
	
	document.getElementById('rel1').value = fin;

	fin = '';
	for (i in relatt) {
		if(rela[relatt[i]] || relatt[i] == '') continue;
		rela[relatt[i]] = 1;
		fin += "rela['"+relatt[i]+"'] = '"+relmul[i]+'#'+reltik[i]+"';\n";
	}
	document.getElementById('rel2').value = fin;

	fin = '';
	for (i in reltik) {
		if(relt[reltik[i]] || reltik[i] == '') continue;
		relt[reltik[i]] = 1;
		fin += "relt['"+reltik[i]+"'] = '"+relmul[i]+'#'+relatt[i]+"';\n";
	}
	document.getElementById('rel3').value = fin;
}
function noahs() {
	var hi = ['m','a']; //,'t'
	var nik = 'k';
	var books = 15;
	var finalout = '<table><tr>';
	var out = [];
	
	for (h = 0; h < hi.length; h++) {
		out[hi[h]] = [];
		for (j=14; j < books; j++) {
			if(kudvala[(j+1)] == undefined) continue;
			var i = j;
			if (h == 1) i = kudvala[(j+1)];
			var xmlhttp = new window.XMLHttpRequest();
			xmlhttp.open("GET", 'xml/'+nik+(j+1)+hi[h]+'.xml', false);
			xmlhttp.send(null);
			var xmlDoc = xmlhttp.responseXML.documentElement;

			var u = xmlDoc.getElementsByTagName("h0");
			
			for (var sx = 0; sx < u.length; sx++) // per h0
			{							
				name = u[sx].getElementsByTagName("h0n")[0].textContent.replace(/ /g, '');
				if (u.length > 1 && name == '') { name = unnamed; }
				if(name && name.length > 1) {
					out[hi[h]].push(' '+name+'^'+nik+'^'+i+'^'+sx+'^0^0^0^0^1');
				}
				var v = u[sx].getElementsByTagName("h1");
					
				for (var sy = 0; sy < v.length; sy++) // per h1
				{			
					name = v[sy].getElementsByTagName("h1n")[0].textContent.replace(/ /g, '');
					if (v.length > 1 && name == '') { name = unnamed; }
					if(name && name.length > 1) {
						out[hi[h]].push('  '+name+'^'+nik+'^'+i+'^'+sx+'^'+sy+'^0^0^0^2');
					}
					var w = v[sy].getElementsByTagName("h2");
				
					for (var sz = 0; sz < w.length; sz++) // per h2
					{
						name = w[sz].getElementsByTagName("h2n")[0].textContent.replace(/ /g, '');
						if (w.length > 1 && name == '') { name = unnamed; }
						if(name && name.length > 1) {
							out[hi[h]].push('   '+name+'^'+nik+'^'+i+'^'+sx+'^'+sy+'^'+sz+'^0^0^3');
						}
						var x = w[sz].getElementsByTagName("h3");
						
						for (var s = 0; s < x.length; s++) // per h3
						{
							name = x[s].getElementsByTagName("h3n")[0].textContent.replace(/ /g, '');
							if (x.length > 1 && name == '') { name = unnamed; }
							if(name && name.length > 1) {
								out[hi[h]].push('    '+name+'^'+nik+'^'+i+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^0^4');
							}
							var y = x[s].getElementsByTagName("h4");
							
							for (var se = 0; se < y.length; se++) // per h4
							{
								if(!y[se].getElementsByTagName("h4n")[0]) alert(h+' '+name+'^'+nik+'^'+i+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^'+se);
								name = y[se].getElementsByTagName("h4n")[0].textContent.replace(/ /g, '');
								if (y.length > 1 && name == '') { name = unnamed; }
								if(name && name.length > 1) {
									out[hi[h]].push('     '+name+'^'+nik+'^'+i+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^'+se+'^5');
								}
							}
						}
					}
				}
			}
		}
		finalout += '<td><textarea  id="'+hi[h]+'"></textarea></td>';
	}
	finalout += '</tr>';
	finalout += '</table>';
	document.getElementById('mafbc').innerHTML = finalout;
	for (h = 0; h < hi.length; h++) {
			document.getElementById(hi[h]).value=out[hi[h]].join('\n');
	}
}
		
function noahsx() {


var xmall = [];

xmall.push('a10a');
xmall.push('a5a');
xmall.push('k12a');
xmall.push('k3a');
xmall.push('m2m');
xmall.push('s5m');
xmall.push('v6m');
xmall.push('y3m');
xmall.push('a10m');
xmall.push('a5m');
xmall.push('d1a');
xmall.push('k12m');
xmall.push('k3m');
xmall.push('m2t');
xmall.push('s5t');
xmall.push('v6t');
xmall.push('y3t');
xmall.push('a10t');
xmall.push('a5t');
xmall.push('d1m');
xmall.push('k13a');
xmall.push('k4a');
xmall.push('m3a');
xmall.push('v1a');
xmall.push('x1a');
xmall.push('y4a');
xmall.push('a11a');
xmall.push('a6a');
xmall.push('d1t');
xmall.push('k13m');
xmall.push('k4m');
xmall.push('m3m');
xmall.push('v1m');
xmall.push('x1m');
xmall.push('y4m');
xmall.push('a11m');
xmall.push('a6m');
xmall.push('d2a');
xmall.push('k14a');
xmall.push('k5a');
xmall.push('m3t');
xmall.push('v1t');
xmall.push('x2a');
xmall.push('y4t');
xmall.push('a11t');
xmall.push('a6t');
xmall.push('d2m');
xmall.push('k14m');
xmall.push('k5m');
xmall.push('s1a');
xmall.push('v2a');
xmall.push('x2m');
xmall.push('y5a');
xmall.push('a1a');
xmall.push('a7a');
xmall.push('d2t');
xmall.push('k15a');
xmall.push('k6a');
xmall.push('s1m');
xmall.push('v2m');
xmall.push('y10m');
xmall.push('y5m');
xmall.push('a1m');
xmall.push('a7m');
xmall.push('d3a');
xmall.push('k15m');
xmall.push('k6m');
xmall.push('s1t');
xmall.push('v2t');
xmall.push('y11m');
xmall.push('y5t');
xmall.push('a1t');
xmall.push('a7t');
xmall.push('d3m');
xmall.push('k16m');
xmall.push('k7a');
xmall.push('s2a');
xmall.push('v3a');
xmall.push('y12m');
xmall.push('y6a');
xmall.push('a2a');
xmall.push('a8a');
xmall.push('d3t');
xmall.push('k17m');
xmall.push('k7m');
xmall.push('s2m');
xmall.push('v3m');
xmall.push('y13m');
xmall.push('y6m');
xmall.push('a2m');
xmall.push('a8m');
xmall.push('g1m');
xmall.push('k18m');
xmall.push('k8a');
xmall.push('s2t');
xmall.push('v3t');
xmall.push('y14m');
xmall.push('y6t');
xmall.push('a2t');
xmall.push('a8t');
xmall.push('g2m');
xmall.push('k19m');
xmall.push('k8m');
xmall.push('s3a');
xmall.push('v4a');
xmall.push('y1a');
xmall.push('y7a');
xmall.push('a3a');
xmall.push('a9a');
xmall.push('g3m');
xmall.push('k1a');
xmall.push('k9a');
xmall.push('s3m');
xmall.push('v4m');
xmall.push('y1m');
xmall.push('y7m');
xmall.push('a3m');
xmall.push('a9m');
xmall.push('g4m');
xmall.push('k1m');
xmall.push('k9m');
xmall.push('s3t');
xmall.push('v4t');
xmall.push('y1t');
xmall.push('y7t');
xmall.push('a3t');
xmall.push('a9t');
xmall.push('g5m');
xmall.push('k20m');
xmall.push('m1a');
xmall.push('s4a');
xmall.push('v5a');
xmall.push('y2a');
xmall.push('y8m');
xmall.push('a4a');
xmall.push('b1m');
xmall.push('k10a');
xmall.push('k21m');
xmall.push('m1m');
xmall.push('s4m');
xmall.push('v5m');
xmall.push('y2m');
xmall.push('y9m');
xmall.push('a4m');
xmall.push('k10m');
xmall.push('k2a');
xmall.push('m1t');
xmall.push('s4t');
xmall.push('v5t');
xmall.push('y2t');
xmall.push('a4t');
xmall.push('b2m');
xmall.push('k11m');
xmall.push('k2m');
xmall.push('m2a');
xmall.push('s5a');
xmall.push('v6a');
xmall.push('y3a');

	var out = [];
	var dup = [];
	for (i in xmall) {
		var fi = xmall[i];
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", 'xml/'+fi+'.xml', false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;

		var name = xmlDoc.getElementsByTagName("han")[0].childNodes[0];
		
		out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')] = fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^0^0^0^0^0^'+fi.charAt(fi.length-1)+'^0';
		
		var u = xmlDoc.getElementsByTagName("h0");
		
		var iw = fi.charAt(0);
		var ino = parseInt(fi.substring(1));		
		
		for (var sx = 0; sx < u.length; sx++) // per h0
		{							
			name = u[sx].getElementsByTagName("h0n")[0].childNodes[0];
			if(name && name.nodeValue != ' ') {
				if(out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')]) out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')] += '#'+fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^0^0^0^0^'+fi.charAt(fi.length-1)+'^1';
				else out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')] = fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^0^0^0^0^'+fi.charAt(fi.length-1)+'^1';
			}
			var v = u[sx].getElementsByTagName("h1");
				
			for (var sy = 0; sy < v.length; sy++) // per h1
			{			
				name = v[sy].getElementsByTagName("h1n")[0].childNodes[0];
				if(name && name.nodeValue != ' ') {
					if(out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')]) out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')] += '#'+fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^0^0^0^'+fi.charAt(fi.length-1)+'^2';
					else out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')] = fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^0^0^0^'+fi.charAt(fi.length-1)+'^2';
				}
				var w = v[sy].getElementsByTagName("h2");
			
				for (var sz = 0; sz < w.length; sz++) // per h2
				{
					name = w[sz].getElementsByTagName("h2n")[0].childNodes[0];
					if(name && name.nodeValue != ' ') {
						if(out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')]) out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')] += '#'+fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^'+sz+'^0^0^'+fi.charAt(fi.length-1)+'^3';
						else out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')] = fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^'+sz+'^0^0^'+fi.charAt(fi.length-1)+'^3';
					}
					var x = w[sz].getElementsByTagName("h3");
					
					for (var s = 0; s < x.length; s++) // per h3
					{
						name = x[s].getElementsByTagName("h3n")[0].childNodes[0];
						if(name && name.nodeValue != ' ') {
							if(out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')]) out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')] += '#'+fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^0^'+fi.charAt(fi.length-1)+'^4';
							else out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')] = fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^0^'+fi.charAt(fi.length-1)+'^4';
						}
						var y = x[s].getElementsByTagName("h4");
						
						for (var se = 0; se < y.length; se++) // per h4
						{
							name = y[se].getElementsByTagName("h4n")[0].childNodes[0];
							if(name && name.nodeValue != ' ') {
								if(out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')]) out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')] += '#'+fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^'+se+'^'+fi.charAt(fi.length-1)+'^5';
								else out[name.nodeValue.replace(/^[()0-9-. ]*[)0-9-. ]+/,'')] = fi.charAt(0)+'^'+fi.substring(1,fi.length-1)+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^'+se+'^'+fi.charAt(fi.length-1)+'^5';
							}
						}
					}
				}
			}
		}
	}
	for (j in out) {
		dup.push(j+'#'+out[j]);
	}
	dup=sortaz(dup);

	document.textpad.pad.value="titlelist.push('"+dup.join("');\ntitlelist.push('") + "');";
}

function noahsb() {
	var out = [];
	var dup = [];

var fiat = [];

for (i in filearraya) {
	fiat.push('a'+filearraya[i]);
}
for (i in filearrayt) {
	fiat.push('t'+filearrayt[i]);
}

for (i in fiat) {
	var fi = fiat[i];
	
	var xmlhttp = new window.XMLHttpRequest();
    xmlhttp.open("GET", 'xml/'+fi+'a.xml', false);
    xmlhttp.send(null);
    var xmlDoc = xmlhttp.responseXML.documentElement;

	var u = xmlDoc.getElementsByTagName("h0");
	var type = fi.charAt(0);
	var iw = fi.charAt(1);
	var ino = parseInt(fi.substring(2));		
	
	for (var sx = 0; sx < u.length; sx++) // per h0
	{							
		var v = u[sx].getElementsByTagName("h1");
			
		for (var sy = 0; sy < v.length; sy++) // per h1
		{			
			var w = v[sy].getElementsByTagName("h2");
		
			for (var sz = 0; sz < w.length; sz++) // per h2
			{
				var x = w[sz].getElementsByTagName("h3");
				
				for (var s = 0; s < x.length; s++) // per h3
				{
					var y = x[s].getElementsByTagName("h4");
					
					for (var se = 0; se < y.length; se++) // per h4
					{
						var z = y[se].getElementsByTagName("p");		

						for (var tmp = 0; tmp < z.length; tmp++) // per paragraph
						{
							var text = z[tmp].childNodes[0].nodeValue;
							var qus = text.search(/\^b\^/);
							while (qus > -1) {
								var que = text.search(/\^eb\^/);
								var term = text.substring(qus+3,que);
								term = term.replace(/^\.+pe0*[^a-zA-Z]+ */g,'').replace(/``/g,'“').replace(/''/g,'“').replace(/'/g,'’').replace(/`/g,'‘').replace(/^[^a-zA-Z\.~]*/g,'').replace(/^[^a-zA-Z]  */g,'').replace(/   */g,' ').replace(/[^a-zA-Z]*$/g,'').toLowerCase();
								if (term != '') {
									if(dup[term]) dup[term] += '#'+iw+'^'+ino+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^'+se+'^'+tmp+'^'+type;
									else dup[term] = iw+'^'+ino+'^'+sx+'^'+sy+'^'+sz+'^'+s+'^'+se+'^'+tmp+'^'+type;
								}
								text = text.substring(que+4);
								qus = text.search(/\^b\^/);
							}
						}
					}
				}
			}
		}
	}
}
for (j in dup) {
	out.push(j+'#'+dup[j]);
}
out=sortaz(out);

document.textpad.pad.value="attlist.push('"+out.join("');\nattlist.push('") + "');";
}

/*
            var file = 'xml/listam.xml';
            
            var xmlhttp = new window.XMLHttpRequest();
            xmlhttp.open("GET", file, false);
            xmlhttp.send(null);
            var xmlDoc = xmlhttp.responseXML.documentElement;
            var w = xmlDoc.getElementsByTagName('ab');
            
            var out = 'var amlist = [];\n';
            var countv = -1;
            var countc = 0;
            
            for (a = 0; a < w.length; a++) {
				out+='amlist['+a+'] = [];\n';
				var x = w[a].getElementsByTagName('av');
				for(b = 0; b < x.length; b++) {
					out+='amlist['+a+']['+b+'] = [];\n';
					countc = 0;
					var y = x[b].getElementsByTagName('as');
					for(c = 0; c < y.length; c++) {
						out+='amlist['+a+']['+b+']['+c+'] = [];\n';
						var z = y[c].getElementsByTagName('ac');
						for(d = 0; d < z.length; d++) {
							out+='amlist['+a+']['+b+']['+c+']['+d+'] = [];\n';
							var zz = z[d].getElementsByTagName('ap');
							for(e = 0; e < zz.length; e++) {
								out+='amlist['+a+']['+b+']['+c+']['+d+']['+e+'] = '+zz[e].childNodes[0].nodeValue+';\n';
							}
						}
					}
				}
			}
document.textpad.pad.value = out;						
*/
function makeSin() {
	var vowel = ['a','ā','i','ī','u','ū','e','o'];
	var cons = ['ā','i','ī','u','ū','e','o','ṃ','k','kh','g','gh','ṅ','c','ch','j','jh','ñ','ṭ','ṭh','ḍ','ḍh','ṇ','t','th','d','dh','n','p','ph','b','bh','m','y','r','l','ḷ','v','s','h'];

	var sinV = ['අ','ආ','ඉ','ඊ','උ','ඌ','එ','ඔ']

	var sinC = ['ා','ි','ී','ු','ූ','ෙ','ො','ං','ක','ඛ','ග','ඝ','ඞ','ච','ඡ','ජ','ඣ','ඤ','ට','ඨ','ඩ','ඪ','ණ','ත','ථ','ද','ධ','න','ප','ඵ','බ','භ','ම','ය','ර','ල','ළ','ව','ස','හ']


	var padOut = '';

	for(i in sinV) {
	padOut += "vowel['"+vowel[i] + "'] = '" + sinV[i] + "';\n";
	}
	document.textpad.pad.value = padOut;
}

function getWordList(){
	
	var dataout = [];
	
	for (i = 0; i < 4; i++) {
		
		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", 'etc/XML1/'+i+'/ped.xml', false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		var allp = xmlDoc.getElementsByTagName('data');
		
		for (j =0; j < allp.length; j++) {
			var alld = allp[j].textContent.replace(/<[^>]*>/g, '').replace(/   */g, ' ').split(' ');
			
			var thisterms = [];
			
			for (k = 0; k < alld.length; k++) {
				var thisd = 'XYZ'+alld[k].replace(/[0-9\/\+\%";.\-\&\*!,)(:<=>?\[\]_˚ɔ≈\\]+/g, '').replace(/'$/g, '').replace(/^[~']/g, '').toLowerCase();
				if (thisd.length < 7) continue;
				if(thisterms[thisd]) continue;
				thisterms[thisd] = 1;
				if(dataout[thisd]) {
					dataout[thisd] += '#' + i + '^' + j;
				}
				else dataout[thisd] = i + '^' + j;
			}
		}
	}
	var outputD = [];
	for (l in dataout) {
		outputD.push(l.substring(3) + '#' + dataout[l]); 
	}
	outputD = outputD.sort();
	writeFile('devTest',"var pedFull = [];\npedFull.push('"+outputD.join("');\npedFull.push('") + "');", 'UTF-8');

}


function noah11()
{
	var dataout = '';
	for (i = 0; i <= 4; i++) {
	
		var pedp = 'etc/XML1/'+ i +'/ped.xml';

		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", pedp, false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		var cntx = xmlDoc.getElementsByTagName('data').length;
		var noc = ''; 
		var nocd = 'x';
		var nocdo;
		for (e = 0; e < cntx; e++) {
			noc = i+'/'+e;
			if ( noahda[noc]) {
				if ( noahda[noc].charAt(0) != nocd.charAt(0)) { dataout += '<h1>' + noahda[noc].charAt(0) + '</h1>\n'; }
				nocd = noahda[noc];
				var dataa = xmlDoc.getElementsByTagName('data')[e].getElementsByTagName('sdata');
				var data = '';
				for (j=0; j<dataa.length; j++) {
					data += dataa[j].textContent;
				}
				nocdo = nocd.replace(/aa/g, 'ā');
				nocdo = nocdo.replace(/ii/g, 'ī');
				nocdo = nocdo.replace(/uu/g, 'ū');
				nocdo = nocdo.replace(/,t/g, 'ṭ');
				nocdo = nocdo.replace(/,d/g, 'ḍ');
				nocdo = nocdo.replace(/`n/g, 'ṅ');
				nocdo = nocdo.replace(/,n/g, 'ṇ');
				nocdo = nocdo.replace(/,m/g, 'ṃ');
				nocdo = nocdo.replace(/\~n/g, 'ñ');
				nocdo = nocdo.replace(/,l/g, 'ḷ');				
				nocdo = nocdo.replace(/`/g, '-');
				nocdo = nocdo.replace(/z/g, ' ');
				dataout	+= '<h2>' + nocdo + '</h2>\n<p>' + data + '\n';
			}
		}
	}
	
	writeFile('PEDdata.html', dataout, 'UTF-8')
}

function noah22()
{
	var dataout = '';
	for (i = 1; i <= 8; i++) {
	
		var dn = 'etc/XML2/'+ i +'.xml';

		var xmlhttp = new window.XMLHttpRequest();
		xmlhttp.open("GET", dn, false);
		xmlhttp.send(null);
		var xmlDoc = xmlhttp.responseXML.documentElement;
		
		var en = xmlDoc.getElementsByTagName('entry');
		for (j = 0; j < en.length; j++) { 
			var out = '';
			var da = en[j].getElementsByTagName('data');
			for (k = 0; k < da.length; k++) {
				if(da[k].childNodes[0]) {
					var data = da[k].textContent;
					out += data;
				}
			}
			writeFile(i+'.'+j+'.html', out, 'UTF-8')
		}
		out = out.replace(/\&lt;/g, '\n<');
		out = out.replace(/\&gt;/g, '>');
	}
}


function noahddd() {
//	alert('yes');
	var out = '';
	var x=0;
	for (i = 0; i< devmain.length; i++) {
		if (devmain[i+1] && devmain[i][0] == devmain[i+1][0]) {
			x++;
			out+='mainda["'+devmain[i][0]+'z'+x+'"] = "'+devmain[i][1]+'"; //'+devmain[i][2]+'\n';
			//alert(devmain[i]);
		}
		else {
			if(x >0) out+='mainda["'+devmain[i][0]+'z'+(x+1)+'"] = "'+devmain[i][1]+'"; //'+devmain[i][2]+'\n';
			else out+='mainda["'+devmain[i][0]+'"] = "'+devmain[i][1]+'"; //'+devmain[i][2]+'\n';
			x=0;
		}
	}
	document.textpad.pad.value = out;
}
		

function noahd() {
	var engN = sortaz(newE);
	out = '';
	for (i in engN) {
		var x = engN[i].split(',');
		out += 'yt['+replacevelstandard(x.shift()).replace(/"n/g, '`n').replace(/\./g, ',')+'] = ['+x.join(',')+'];\n';
	}
	writeFile('english1.js', out);
}
