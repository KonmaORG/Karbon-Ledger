"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { submitProject } from "@/lib/transactions"
import { useWallet } from "@/context/walletContext"

const categories = ["forest", "water", "air", "deforestration", "Algae Treatment"]

export default function ProjectSubmit() {
    const [walletConnection] = useWallet()

    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [file, setFile] = useState<File | null>(null)
    const [fileHash, setFileHash] = useState<string>("")
    const [title, setTitle] = useState<string>("")

    const [isUploading, setIsUploading] = useState(false)
    const [open, setOpen] = useState(false)

    const calculateHash = async (file: File): Promise<string> => {
        const buffer = await file.arrayBuffer()
        const hashBuffer = await crypto.subtle.digest("SHA-256", buffer)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        return hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            if (selectedFile.size > 2 * 1024 * 1024) {
                alert("File size exceeds 2MB limit")
                return
            }
            setFile(selectedFile)
            const hash = await calculateHash(selectedFile)
            setFileHash(hash)
        }
    }

    const dummyApiCall = async (file: File, category: string, title: string): Promise<void> => {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log(`File "${file.name}" with title "${title}" uploaded with category "${category}"`)
    }


    const handleSubmit = async () => {
        if (file && selectedCategory && title) {
            try {
                setIsUploading(true)
                await submitProject(walletConnection, fileHash, selectedCategory, title);
                await dummyApiCall(file, selectedCategory, title);
                console.log("File uploaded successfully!");
                setFile(null)
                setFileHash("")
                setTitle("")
                setSelectedCategory("")
            } catch (error) {
                console.error("Error during submission:", error);
            } finally {
                setIsUploading(false)
            }
        } else {
            console.log("Please fill in all fields and upload a file");
        }
    }

    return (
        <Dialog defaultOpen>
            {/* <DialogTrigger asChild>
                <Button >Submit Project</Button>
            </DialogTrigger> */}
            <DialogContent className="sm:max-w-[425px]" aria-describedby="project submit dialog">
                <DialogHeader>
                    <DialogTitle>Submit New Project</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="col-span-3"
                            placeholder="Enter title"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">
                            Category
                        </Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="col-span-3 justify-between"
                                >
                                    {selectedCategory
                                        ? categories.find((category) => category === selectedCategory)
                                        : "Select category..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search category..." />
                                    <CommandList>
                                        <CommandEmpty>No category found.</CommandEmpty>
                                        <CommandGroup>
                                            {categories.map((category) => (
                                                <CommandItem
                                                    key={category}
                                                    onSelect={() => {
                                                        setSelectedCategory(category === selectedCategory ? "" : category)
                                                        setOpen(false)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            selectedCategory === category ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {category}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="file" className="text-right">
                            File
                        </Label>
                        <Input
                            id="file"
                            type="file"
                            onChange={handleFileChange}
                            className="col-span-3"
                            accept="*/*"
                        />
                    </div>
                    {fileHash && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">File Hash</Label>
                            <div className="col-span-3 truncate">{fileHash}</div>
                        </div>
                    )}
                </div>
                <Button onClick={handleSubmit} disabled={!file || !selectedCategory || !title || isUploading}>
                    {isUploading ? "Submitting..." : "Submit"}
                </Button>
            </DialogContent>
        </Dialog>
    )
}

