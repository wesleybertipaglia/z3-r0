import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import { Settings } from "lucide-react"
import { Button } from "../ui/button"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { useMessage } from "@/hooks/message/useMessage"
import { useTranslation } from "react-i18next"

const Menu = () => {
    const { clear } = useMessage();
    const { t } = useTranslation();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="w-10 h-10 rounded-full bg-transparent hover:bg-neutral-800 flex text-neutral-50 cursor-pointer items-center justify-center">
                    <Settings className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-neutral-900 border border-neutral-800 text-neutral-50 w-fit text-end cursor-pointer p-2 rounded-md shadow-lg space-y-2">
                <DropdownMenuLabel className="font-bold border-b border-neutral-800 pb-1 mb-2">{t("ui.settings")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <LanguageSwitcher />
                <DropdownMenuItem className="font-normal">
                    <Button onClick={clear} className="bg-transparent hover:bg-neutral-800 w-full text-left cursor-pointer rounded">
                        <span className="text-sm">{t("ui.clear_chat")}</span>
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Menu