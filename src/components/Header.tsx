'use client'

import Link from "next/link"
import { BiHome } from "react-icons/bi"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarText, NavItem, NavLink } from "reactstrap"
import Image from 'next/image';
import { useSDK } from "@metamask/sdk-react";
import { useState } from "react";
import { formatAddress } from "@/functions/formatAddress";

export default function Header() {
    const { sdk, connected, connecting, account } = useSDK()

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState)

    const connect = async () => {
        try {
            await sdk?.connect();
        } catch (err) {
            console.warn(`No accounts fouind`, err)
        }
    }

    const disconnect = async () => {
        if (sdk) {
            sdk.terminate();
        }
    }

    return (
        <>
            <Navbar style={{ background: "#6c5ce7" }}>
                <NavbarBrand href="/" className="text-white">{process.env.NEXT_PUBLIC_WEBSITE_NAME}</NavbarBrand>
                <Nav>
                    <NavItem>
                        <Link className="nav-link text-white" href={"/"}>
                            <div className="d-flex justify-content-center align-items-center">
                                <BiHome className="me-1 fs-5" />
                                <span className="fs-6">Home</span>
                            </div>
                        </Link>
                    </NavItem>
                </Nav>
                <NavbarText>
                    {!connected ? <><Button outline className="text-white metmask-button" style={{ border: "1px solid #fff" }} onClick={connect}>
                        <Image src="/metamask.webp" alt="" width={30} height={30} /> Connect Metamask
                    </Button></> : <>
                        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction='down'>
                            <DropdownToggle color='warning' className='btn-outline'>
                                <Image src="/metamask.webp" alt="" width={30} height={30} />
                                <span className='ms-2'>{account ? formatAddress(account) : "Connect Metamask"}</span>
                            </DropdownToggle>
                            <DropdownMenu className='w-100'>
                                <DropdownItem header>Your profile <hr /></DropdownItem>
                                <DropdownItem>
                                    {connected ? <div onClick={disconnect}>Disconnect</div> : <></>}
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </>}
                </NavbarText>
            </Navbar>
        </>
    )
}