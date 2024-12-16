"use client";
import type {
	ConstructorObjectState,
	OfferType,
} from "@/stores/car-constructor.store";
import {
	Document,
	Font,
	Image,
	Page,
	StyleSheet,
	Text,
	View,
} from "@react-pdf/renderer";
type Props = {
	constructor: ConstructorObjectState;
	offer: OfferType;
};
export default function CommercialOfferComponent({
	constructor,
	offer,
}: Props) {
	Font.register({
		family: "Roboto",
		fontWeight: "light",
		src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
	});
	Font.register({
		family: "Roboto",
		fontWeight: "normal",
		src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
	});
	Font.register({
		family: "Roboto",
		fontWeight: "bold",
		src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
	});
	const styles = StyleSheet.create({
		page: {
			fontFamily: "Roboto",
			flexDirection: "column",
			backgroundColor: "#fff",
		},
		header: {
			flexDirection: "row",
			display: "flex",
			position: "relative",
			alignItems: "center",
			height: 50,
			padding: "10px 30px 10px 30px",
			margin: "20px 10px",
			// borderBottom: '1 solid black'
		},

		headerTitle: {
			fontSize: 15,
			color: "#000",
			fontWeight: "semibold",
			textAlign: "center",
			width: "100%",
			fontFamily: "Roboto",
			// width: 'max-content'
		},
		logo: {
			width: "95px",
			height: "90px",
			position: "absolute",
			left: 0,
			top: "-30%",
		},

		section: {
			margin: 10,
			padding: 10,
			flexGrow: 1,
			fontSize: 12,
		},
		bold: {
			fontWeight: "bold",
		},
	});
	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.header}>
					<Image style={styles.logo} src={"/navbar/chinacar_logo.png"} />
					<Text
						style={{
							fontSize: "22px",
							color: "#000",
							fontWeight: "bold",
							textAlign: "center",
							width: "100%",
							fontFamily: "Roboto",
						}}
					>
						{offer?.model.name}
					</Text>
				</View>
				<View>
					<Image
						src={constructor?.renderImage}
						style={{ width: "100%", height: "300px", objectFit: "contain" }}
					/>
				</View>

				<View
					style={{
						padding: "20px",
						display: "flex",
						width: "100%",
						flexDirection: "column",
					}}
				>
					<View
						style={{
							fontSize: "15px",
							display: "flex",
							flexDirection: "row",
							gap: "2px",
							width: "50%",
						}}
					>
						<Text>1. Цвет кузова: </Text>
						<Text style={{ fontWeight: "bold", textTransform: "capitalize" }}>
							{offer?.body.name}
						</Text>
					</View>
					<View style={{ width: "50%" }}>
						<View
							style={{
								fontSize: "15px",
								display: "flex",
								flexDirection: "row",
								gap: "2px",
							}}
						>
							<Text>2. Диски: </Text>
							<Text style={{ fontWeight: "bold", textTransform: "capitalize" }}>
								{offer?.wheels.name}
							</Text>
						</View>
						<Image
							src={constructor?.wheels.btnUrl}
							style={{ width: "90px", height: "90px" }}
						/>
					</View>
					<View style={{ width: "50%" }}>
						<View
							style={{
								fontSize: "15px",
								display: "flex",
								flexDirection: "row",
								gap: "2px",
							}}
						>
							<Text>3. Интерьер: </Text>
							<Text style={{ fontWeight: "bold", textTransform: "capitalize" }}>
								{offer?.wheels.name}
							</Text>
						</View>
						<Image
							src={constructor?.interior_colors.renderImage}
							style={{ width: "100%", height: "200px", objectFit: "contain" }}
						/>
					</View>
				</View>
			</Page>
		</Document>
	);
}
