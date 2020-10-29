import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import imageA from "../assets/home-image-2.jpg";
import imageB from "../assets/our-story-image-2.jpg";
import imageC from "../assets/our-story-image-3.jpg";

const blockA = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bonum patria: miserum exilium.
    Velut ego nunc moveor.Ne discipulum abducam, times. Pugnant Stoici cum Peripateticis. 
    Si qua in iis corrigere voluit, deteriora fecit. Sed tamen intellego quid velit. Sed 
    residamus, inquit, si placet.Que Manilium, ab iisque M. Duo Reges: constructio interrete.
    Omnia contraria, quos etiam insanos esse vultis.Non igitur bene.Non autem hoc: igitur ne 
    illud quidem. An potest cupiditas finiri?
`;

const blockB = `
    Consequentia exquirere, quoad sit id, quod volumus, effectum. Omnes enim iucundum motum, 
    quo sensus hilaretur. Atqui reperies, inquit, in hoc quidem pertinacem; Iubet igitur nos 
    Pythius Apollo noscere nosmet ipsos. Gerendus est mos, modo recte sentiat. Hoc etsi 
    multimodis reprehendi potest, tamen accipio, quod dant. Universa enim illorum ratione 
    cum tota vestra confligendum puto. Uterque enim summo bono fruitur, id est voluptate. 
    Illa sunt similia: hebes acies est cuipiam oculorum, corpore alius senescit; Rationis 
    enim perfectio est virtus; Duo Reges: constructio interrete. Oratio me istius philosophi 
    non offendit. Duo Reges: constructio interrete. Quis enim confidit semper sibi illud 
    stabile et firmum permansurum, quod fragile et caducum sit? Suo genere perveniant ad 
    extremum; Cenasti in vita numquam bene, cum omnia in ista Consumis squilla atque 
    acupensere cum decimano
`;

export default function AboutGlobo() {
	return (
		<View style={styles.container}>
			<ScrollView>
				<Image source={imageA} style={{ width: "100%", height: 300 }} />
				<Text style={styles.heading}>We Are Different</Text>
				<Text style={styles.text}>{blockA}</Text>
				<Image source={imageB} style={{ width: "100%", height: 300 }} />
				<Text style={styles.heading}>Leaders in our field</Text>
				<Text style={styles.text}>{blockB}</Text>
				<Image source={imageC} style={{ width: "100%", height: 400 }} />
				<Text style={styles.heading}>We are the Experts</Text>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	heading: {
		fontFamily: "OpenSans",
		fontWeight: "bold",
		paddingTop: 5,
	},
	text: {
		fontFamily: "OpenSans",
	},
});
