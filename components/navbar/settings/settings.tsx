import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Settings } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";

export function NavSettings() {
    const [fortColor, setFortColor] = useState("#FF0000");
    const [moyenColor, setMoyenColor] = useState("#fcd73f");
    const [faibleColor, setFaibleColor] = useState("#33FF57");
    const [open, setOpen] = useState(false)
    const isMobile = useIsMobile()

    const loadSavedColors = () => {
        const savedColors = Cookies.get("colorSettings");
        if (savedColors) {
            const parsedColors = JSON.parse(savedColors);
            setFortColor(parsedColors.fortColor);
            setMoyenColor(parsedColors.moyenColor);
            setFaibleColor(parsedColors.faibleColor);
            
            document.documentElement.style.setProperty("--color-fort", parsedColors.fortColor);
            document.documentElement.style.setProperty("--color-moyen", parsedColors.moyenColor);
            document.documentElement.style.setProperty("--color-faible", parsedColors.faibleColor);
        }
    };

    const handleSubmitColors = () => {
        try{
            document.documentElement.style.setProperty("--color-fort", fortColor);
            document.documentElement.style.setProperty("--color-moyen", moyenColor);
            document.documentElement.style.setProperty("--color-faible", faibleColor);
            
            Cookies.set("colorSettings", JSON.stringify({ fortColor, moyenColor, faibleColor }));
            setOpen(false)
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        loadSavedColors();
    }, []);

    if (isMobile) {
        return (
            <SidebarGroup>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Drawer onOpenChange={setOpen} open={open}>
                            <DrawerTrigger asChild>
                                <SidebarMenuButton tooltip="Paramètres">
                                    <Settings />
                                    <span>Paramètres</span>
                                </SidebarMenuButton>
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DialogTitle>Paramètres de l&apos;application</DialogTitle>
                                    <DialogDescription>Ici vous pouvez modifier les paramètres de l&apos;application</DialogDescription>
                                </DrawerHeader>
    
                                <div className="grid items-center grid-cols-2 gap-2 text-right p-2">
                                    <Label>Couleur forte</Label>
                                    <Input
                                        type="color"
                                        value={fortColor}
                                        onChange={(e) => setFortColor(e.target.value)}
                                        className="col-span-1"
                                    />
    
                                    <Label>Couleur moyenne</Label>
                                    <Input
                                        type="color"
                                        value={moyenColor}
                                        onChange={(e) => setMoyenColor(e.target.value)}
                                        className="col-span-1"
                                    />
    
                                    <Label>Couleur faible</Label>
                                    <Input
                                        type="color"
                                        value={faibleColor}
                                        onChange={(e) => setFaibleColor(e.target.value)}
                                        className="col-span-1"
                                    />
                                </div>
                                <DrawerFooter className="pb-4 md:pb-0">
                                    <Button onClick={handleSubmitColors}>
                                        Appliquer les couleurs
                                    </Button>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
        );
    }

    return (
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                    <Dialog onOpenChange={setOpen} open={open}>
                        <DialogTrigger asChild>
                            <SidebarMenuButton tooltip="Paramètres">
                                <Settings />
                                <span>Paramètres</span>
                            </SidebarMenuButton>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Paramètres de l&apos;application</DialogTitle>
                                <DialogDescription>Ici vous pouvez modifier les paramètres de l&apos;application</DialogDescription>
                            </DialogHeader>

                            <div className="grid items-center grid-cols-3 gap-2 text-right">
                                <Label>Couleur forte</Label>
                                <Input
                                    type="color"
                                    value={fortColor}
                                    onChange={(e) => setFortColor(e.target.value)}
                                    className="col-span-2"
                                />

                                <Label>Couleur moyenne</Label>
                                <Input
                                    type="color"
                                    value={moyenColor}
                                    onChange={(e) => setMoyenColor(e.target.value)}
                                    className="col-span-2"
                                />

                                <Label>Couleur faible</Label>
                                <Input
                                    type="color"
                                    value={faibleColor}
                                    onChange={(e) => setFaibleColor(e.target.value)}
                                    className="col-span-2"
                                />
                            </div>
                            <DialogFooter className="pb-4 md:pb-0">
                                <Button onClick={handleSubmitColors}>
                                    Appliquer les couleurs
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}
