'use client';

import MetaMaskProvider from "@/providers/MetaMaskProvider";

export default function ContentWrapper({ children }: any) {
    return (
        <>
            <MetaMaskProvider>{children}</MetaMaskProvider>
        </>
    )
}