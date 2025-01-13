"use client";

import { getStrapiMedia } from "@/utils/api-helpers";
import {
	Defs,
	Document,
	Font,
	Image,
	LinearGradient,
	Page,
	Rect,
	Stop,
	StyleSheet,
	Svg,
	Text,
	View,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

// Регистрация шрифтов
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

// Стили
const styles = StyleSheet.create({
	page: {
		fontFamily: "Roboto",
		flexDirection: "column",
		backgroundColor: "black",
	},
	header: {
		flexDirection: "row",
		display: "flex",
		position: "relative",
		alignItems: "center",
		height: "300px",
		padding: "10px 35px 10px 35px",
		// margin: "20px 10px",
	},
	headerTitle: {
		fontSize: 15,
		color: "#000",
		fontWeight: "semibold",
		textAlign: "center",
		width: "100%",
		fontFamily: "Roboto",
	},

	section: {
		margin: 5,
		padding: 3,
		flexGrow: 1,
		fontSize: 9,
	},
	bold: {
		fontWeight: "bold",
	},
	table: {
		fontSize: 9,
		borderStyle: "solid",
		borderWidth: 1,
		borderRightWidth: 0,
		borderBottomWidth: 0,
	},
	tableRow: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
	},
	footer: {
		marginTop: 20,
		padding: 10,
		borderTop: "1px solid #000",
	},
	footerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
	},
	footerCol: {
		width: "48%",
	},
	footerText: {
		fontSize: 10,
	},
	signature: {
		height: 50,
		borderBottom: "1px solid #000",
		marginTop: 10,
	},
});

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const CommercialOfferComponent = ({ offer, constructor }: any) => {
	const currentDate = new Date();
	const formattedDate = format(currentDate, "d MMMM yyyy", { locale: ru });
	console.log("offer", offer);
	console.log("constructor", constructor);
	const additional_options = offer?.additional_options;
	const optionsArray =
		additional_options && Object.keys(additional_options).length > 0
			? Object.values(additional_options)
			: [];
	const totalOptionsPrice = optionsArray.reduce(
		//@ts-ignore
		(sum, option) => sum + option.price,
		0,
	);

	const constructorPrice = constructor.defaultPrice;
	const bodyPrice = constructor.price.body;
	const interiorPrice = constructor.price.interior_colors;
	const wheelsPrice = constructor.price.wheels || 0;
	const finalPrice =
		constructorPrice +
		bodyPrice +
		interiorPrice +
		wheelsPrice +
		totalOptionsPrice;

	const commercial_image = constructor.commercial_image?.data?.attributes;
	console.log("commercial_image", getStrapiMedia(commercial_image.url));

	return (
		<>
			{constructor && offer && (
				<Document>
					<Page size="A4" style={styles.page}>
						<View style={styles.header}>
							<Image
								style={{
									height: "300px",
									width: "100%",

									position: "absolute",
									left: 0,
									top: 0,
									zIndex: 0,
								}}
								//@ts-ignore
								src={getStrapiMedia(commercial_image?.url)}
							/>

							<View style={{ position: "absolute", left: "3%", top: "5%" }}>
								<Image
									style={{
										height: "50px",
										width: "52px",

										zIndex: 200,
									}}
									src={"/navbar/china.png"}
								/>
							</View>
							<View
								style={{
									position: "absolute",
									width: "100%",
									bottom: "10%",
									left: "3%",
									display: "flex",
									flexDirection: "column",
									gap: "0px",
								}}
							>
								<Text
									style={{
										fontSize: "42px",
										color: "#fff",
										fontWeight: "bold",
										textAlign: "left",
										textTransform: "uppercase",
										width: "100%",
										fontFamily: "Roboto",
									}}
								>
									{offer?.model.name}
								</Text>
								<Text
									style={{
										fontSize: "22px",
										fontWeight: "bold",
										color: "#fff",
										textTransform: "uppercase",
									}}
								>
									Коммерческое предложение
								</Text>
							</View>
						</View>
						<View
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "flex-end",
								alignItems: "flex-end",
								width: "100%",
								padding: "0px 20px",
							}}
						>
							<Text
								style={{
									fontSize: "15px",
									fontWeight: "bold",
									textTransform: "uppercase",
									margin: "10px 20px",
									color: "#fff",
								}}
							>
								{formattedDate}
							</Text>
							<Text
								style={{
									fontSize: "8px",
									fontWeight: "bold",
									textAlign: "right",
									width: "30%",
									color: "#d9d9d9",
									opacity: 0.8,
									lineHeight: "0.9",
								}}
							>
								* Цена указана на момент формирования коммерческого предложения
							</Text>
						</View>

						<View style={{ display: "flex", flexDirection: "row" }}>
							<View
								style={{
									flexBasis: "50%",
									padding: "10px 20px 10px 20px",
									display: "flex",
									flexDirection: "column",
									gap: "10px",
								}}
							>
								<View>
									<Text
										style={{
											fontSize: "24px",
											color: "#fff",
											fontWeight: "bold",
											textAlign: "left",
											textTransform: "uppercase",
											width: "100%",
											fontFamily: "Roboto",
										}}
									>
										{offer?.model.name}
									</Text>
								</View>
								<View
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "0px",
									}}
								>
									<Text style={{ fontSize: "12px", color: "#d9d9d9" }}>
										Комплектация:
									</Text>
									<Text style={{ color: "white", fontWeight: "bold" }}>
										{constructor?.configuration}
									</Text>
								</View>
								<View
									style={{
										display: "flex",
										flexDirection: "row",
										gap: "0px",
										width: "100%",
										justifyContent: "space-between",
										// paddingRight: "100px",
									}}
								>
									<View
										style={{
											display: "flex",
											flexDirection: "column",
											gap: "0px",
										}}
									>
										<Text style={{ fontSize: "12px", color: "#d9d9d9" }}>
											Цвет кузова:
										</Text>
										<Text style={{ color: "white", fontWeight: "bold" }}>
											{constructor?.body?.name}
										</Text>
									</View>
									<View
										style={{
											padding: "3px",
											// border: "1px solid black",
											borderRadius: "100%",
											backgroundColor: "#D9D9D9",
										}}
									>
										<View
											style={{
												height: "35px",
												width: "35px",
												borderRadius: "100%",
												backgroundColor: constructor.body.btn_bg,

												overflow: "hidden",
												position: "relative",
												padding: "5px",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}
										/>
									</View>
								</View>
								<View
									style={{
										display: "flex",
										flexDirection: "row",
										gap: "0px",
										width: "100%",
										justifyContent: "space-between",
										// paddingRight: "100px",
									}}
								>
									<View
										style={{
											display: "flex",
											flexDirection: "column",
											gap: "0px",
										}}
									>
										<Text style={{ fontSize: "12px", color: "#d9d9d9" }}>
											Цвет салона:
										</Text>
										<Text style={{ color: "white", fontWeight: "bold" }}>
											{constructor?.interior_colors?.name}
										</Text>
									</View>
									{constructor?.interior_colors?.icon?.data?.attributes
										?.url && (
										<View
											style={{
												padding: "3px",
												// border: "1px solid black",
												borderRadius: "100%",
												backgroundColor: "#D9D9D9",
											}}
										>
											<View
												style={{
													height: "35px",
													width: "35px",
													borderRadius: "100%",
													overflow: "hidden",
													position: "relative",
													padding: "0px",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
												}}
											>
												<Image
													//@ts-ignore
													src={getStrapiMedia(
														constructor.interior_colors.icon?.data?.attributes
															?.url,
													)}
													style={{ width: "100%", height: "100%" }}
												/>
											</View>
										</View>
									)}
								</View>
								{constructor?.wheels !== "default" && (
									<View
										style={{
											display: "flex",
											flexDirection: "row",
											gap: "0px",
											width: "100%",
											justifyContent: "space-between",
											alignItems: "center",
											// paddingRight: "50px",
										}}
									>
										<View
											style={{
												display: "flex",
												flexDirection: "column",
												gap: "0px",
											}}
										>
											<Text style={{ fontSize: "12px", color: "#d9d9d9" }}>
												Диски:
											</Text>
											<Text style={{ color: "white", fontWeight: "bold" }}>
												{constructor?.wheels?.name}
											</Text>
										</View>
										{constructor?.wheels?.btnUrl && (
											<View
												style={{
													// padding: "0px",
													// border: "1px solid black",
													borderRadius: "100%",
													backgroundColor: "#D9D9D9",
												}}
											>
												<View
													style={{
														height: "40px",
														width: "40px",
														borderRadius: "100%",
														overflow: "hidden",
														position: "relative",
														padding: "0px",
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
													}}
												>
													<Image
														src={constructor?.wheels?.btnUrl}
														style={{ width: "100%", height: "100%" }}
													/>
												</View>
											</View>
										)}
									</View>
								)}
								<View style={{ width: "100%", padding: "10px 0" }}>
									<Image
										src={constructor?.interior_colors.renderImage}
										style={{
											width: "100%",
											height: "150px",
											objectFit: "contain",
										}}
									/>
								</View>
							</View>
							<View
								style={{
									flexBasis: "50%",
									padding: "20px",
									display: "flex",
									flexDirection: "column",
									gap: "10px",
									color: "white",
								}}
							>
								<View style={{ backgroundColor: "#000" }}>
									<Image
										src={constructor?.renderImage}
										style={{
											width: "100%",
											height: "200px",
											objectFit: "contain",
										}}
									/>
								</View>
								<View style={{ width: "100%" }}>
									<View style={styles.table}>
										<View style={styles.tableRow}>
											<View style={{ flexBasis: "80%" }}>
												<Text>Наименование</Text>
											</View>
											<View style={{ flexBasis: "20%" }}>
												<Text>Цена</Text>
											</View>
										</View>
										<View style={styles.tableRow}>
											<View style={{ flexBasis: "80%" }}>
												<Text>Модель: {offer?.model.name}</Text>
											</View>
											<View style={{ flexBasis: "20%" }}>
												<Text>{constructorPrice} $</Text>
											</View>
										</View>
										<View style={styles.tableRow}>
											<View style={{ flexBasis: "80%" }}>
												<Text style={{}}>Экстерьер</Text>
											</View>
											<View style={{ flexBasis: "20%" }}>
												<Text style={{}}>{bodyPrice} $</Text>
											</View>
										</View>
										<View style={styles.tableRow}>
											<View style={{ flexBasis: "80%" }}>
												<Text style={{}}>Интерьер</Text>
											</View>
											<View style={{ flexBasis: "20%" }}>
												<Text style={{}}>{interiorPrice} $</Text>
											</View>
										</View>
										{wheelsPrice > 0 && (
											<View style={styles.tableRow}>
												<View style={{ flexBasis: "80%" }}>
													<Text style={{}}>Диски</Text>
												</View>
												<View style={{ flexBasis: "20%" }}>
													<Text style={{}}>{wheelsPrice} $</Text>
												</View>
											</View>
										)}
										{/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
										{optionsArray.map((option: any, index: number) => (
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											<View style={styles.tableRow} key={index}>
												<View style={{ flexBasis: "80%" }}>
													<Text>{option.name}</Text>
												</View>
												<View style={{ flexBasis: "20%" }}>
													<Text style={{}}>{option.price} $</Text>
												</View>
											</View>
										))}
										<View
											style={{
												display: "flex",
												flexDirection: "row",
												width: "100%",
												marginTop: "10px",
												fontSize: "16px",
											}}
										>
											<View style={{ width: "66.66%" }}>
												<Text style={{ fontWeight: "bold" }}>Итого:</Text>
											</View>
											<View style={{ width: "33.33%" }}>
												<Text style={{ fontWeight: "bold", color: "white" }}>
													{finalPrice} $
												</Text>
											</View>
										</View>
									</View>
								</View>
							</View>
						</View>
					</Page>
				</Document>
			)}
		</>
	);
};

export default CommercialOfferComponent;
