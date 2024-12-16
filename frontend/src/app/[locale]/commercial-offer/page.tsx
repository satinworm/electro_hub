"use client";
import CommercialOfferComponent from "@/components/CommercialOfferComponent";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const PDFViewer = dynamic(
	() => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
	{
		ssr: false,
		loading: () => <p>Loading...</p>,
	},
);
// import { PDFViewer } from "@react-pdf/renderer";

export default function CommercialOfferPage() {
	const [constructor, setConstructor] = useState({});
	const [offer, setOffer] = useState({});
	useEffect(() => {
		if (typeof window !== "undefined") {
			const constructorData = localStorage.getItem("constructor");
			const offerData = localStorage.getItem("offer");

			if (constructorData && offerData) {
				setConstructor(JSON.parse(constructorData));
				setOffer(JSON.parse(offerData));
			} else {
				alert(
					"Сначала заполните форму конструктора, и нажмите кнопку 'Сформировать ком. предложение'",
				);
				redirect("/zeekr/constructor");
			}
		}
	}, []);
	// const constructor = localStorage.getItem("constructor");
	// const offer = localStorage.getItem("offer");

	return (
		<section className="my-20 bg-transparent">
			<PDFViewer style={{ width: "100%", height: "100vh" }}>
				<CommercialOfferComponent constructor={constructor} offer={offer} />
			</PDFViewer>
		</section>
	);
}
