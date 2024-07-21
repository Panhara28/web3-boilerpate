import { MetaMaskProvider as MetaMaskContextProvider } from "@metamask/sdk-react";
import { FC } from "react";

interface MetaMaskProviderProps {
    children: React.ReactNode;
}

const MetaMaskProvider: FC<MetaMaskProviderProps> = ({ children }) => {
    const host =
        typeof window !== "undefined" ? window.location.host : "defaultHost";

    const sdkOptions = {
        logging: { developerMode: process.env.NODE_ENV === "development" ? false : process.env.NODE_ENV == "production" ? true : false },
        checkInstallationImmediately: false,
        dappMetadata: {
            name: process.env.NEXT_PUBLIC_WEBSITE_NAME,
            url: host,
        },
    };

    return (
        <>
            <MetaMaskContextProvider debug={false} sdkOptions={sdkOptions} >
                {children}
            </MetaMaskContextProvider>
        </>
    )

}

export default MetaMaskProvider;