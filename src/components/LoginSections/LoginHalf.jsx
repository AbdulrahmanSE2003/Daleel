import Form from "../LoginSections/Form";
import {useTranslation} from "react-i18next";

function LoginHalf({onSwitch}) {
    const {t} = useTranslation();

    return (
        <div
            className="bg-gray-50 w-full h-full ps-8 md:ps-16 p-8 mb-0 md:mb-0 md:mt-20 flex flex-col justify-center gap-5">
            <h3 className="text-4xl font-semibold italic text-gray-800 mb-2">
                {t("loginHalf.title")}
            </h3>
            <p className="text-gray-700">
                <q>{t("loginHalf.subtitle")}</q>
            </p>
            <Form onSwitch={onSwitch}/>
        </div>
    );
}

export default LoginHalf;
