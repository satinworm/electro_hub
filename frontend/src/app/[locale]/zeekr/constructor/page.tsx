// 'use client';
import ZeekrConstructor from "@/components/Zeekr/Constructor";
import type { CarConstructorResponse } from "@/types/zeekr-constructor";

type Props = {
	defaultData: CarConstructorResponse;
	params: { locale: string };
};
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default function ZeekrConstructorPage(props: any) {
	const { defaultData } = props;

	return (
		<>
			<div
				className={
					"hideScrollbar min-h-[100vh] w-full bg-[#e8e8e8] bg-cover bg-fixed bg-no-repeat"
				}
			>
				<div className={"h-[92px] bg-[#1e1e1e]/20"} />
				{defaultData?.meta?.pagination?.total &&
					defaultData?.meta?.pagination?.total > 0 && (
						<ZeekrConstructor defaultData={defaultData} />
					)}
			</div>
		</>
	);
}
