import { AiFillDashboard, AiOutlineSetting } from "react-icons/ai";
import { Icon } from "@chakra-ui/react";
import { ImUser } from "react-icons/im";
import { FaBuromobelexperte, FaIndustry } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export interface INavItem {
    id: number;
    icon?: any;
    path: string;
    label: string;
}

export const NAV_ITEMS: Array<INavItem> = [
    // {
    //     id: 3,
    //     icon: (color: string) => <Icon as={FaIndustry} w={4} h={4} color={color} />,
    //     path: "/industry",
    //     label: "industry"
    // },
    // {
    //     id: 4,
    //     icon: (color: string) => <Icon as={FaBuromobelexperte} w={4} h={4} color={color} />,
    //     path: "/profession",
    //     label: "職業"
    // },
    {
        id: 5,
        icon: (color: string) => <Icon as={AiOutlineSetting} w={4} h={4} color={color} />,
        path: "/setting",
        label: "設定"
    }
];

export const MASTER_ADMIN_NAV_ITEMS: Array<INavItem> = [
    {
        id: 1,
        icon: (color: string) => <Icon as={MdOutlineAdminPanelSettings} w={4} h={4} color={color} />,
        path: "/master-admin/manager",
        label: "manager"
    },
    {
        id: 2,
        icon: (color: string) => <Icon as={FaBuromobelexperte} w={4} h={4} color={color} />,
        path: "/profession",
        label: "Profession"
    }
];

export interface OccupationPages {
    id: number;
    href: string;
    label: string;
}

export const tabs: Array<OccupationPages> = [
    {
        id: 1,
        href: "/tab",
        label: "tab"
    },
    {
        id: 2,
        href: "/group",
        label: "group"
    },
    {
        id: 3,
        href: "/job",
        label: "job"
    }
];
