'use client'
import { Button } from '@/components/ui/button'
import { PID_MINTER, VALIDATOR_CONTRACT_ADDRESS } from '@/config/constants'
import { useWallet } from '@/context/walletContext'
import { acceptProject, rejectProject } from '@/lib/transactions'
import { UTxO } from '@lucid-evolution/lucid'
import React, { useEffect, useState } from 'react'

export default function Projects() {
    const [walletConnection] = useWallet()
    const { lucid } = walletConnection

    const [projects, setProjects] = useState<UTxO[]>([])
    const [rejecting, setRejecting] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (!lucid) return;
        const fetchUtxos = async () => {
            const utxos = await lucid.utxosAt(VALIDATOR_CONTRACT_ADDRESS)
            console.log(utxos, "utxos")
            const filteredUtxos = utxos.filter((utxo) => {
                const assets = utxo.assets;
                return Object.keys(assets).some((key) => key.startsWith(PID_MINTER));
            });
            console.log(filteredUtxos)
            setProjects(filteredUtxos)
        }
        fetchUtxos()
    }, [lucid])



    async function handleReject(utxo: UTxO) {
        setRejecting(true)
        try {
            await rejectProject(walletConnection, utxo)
        } catch (e) {
            console.log(e)
        }
        setRejecting(false)
    }

    async function handleAccept(utxo: UTxO) {
        setSubmitting(true)
        try {
            await acceptProject(walletConnection, utxo)
        } catch (e) {
            console.log(e)
        }
        setSubmitting(false)
    }

    async function metadata(utxo: UTxO) {
        const asset = Object.entries(utxo.assets)
            .filter(([key]) => key.startsWith(PID_MINTER))
            .map(([key]) => key);

        console.log(asset[0])
        const a = await lucid?.metadataOf(asset[0])
        return "abc"
    }
    return (
        <>
            {projects.map((utxo) => {
                return (
                    <div key={utxo.txHash + utxo.outputIndex} className='space-x-2'>
                        <span>{utxo.txHash}#{utxo.outputIndex}</span>
                        <>{metadata(utxo)}</>
                        <Button onClick={() => handleAccept(utxo)} disabled={submitting}>{submitting ? "Accepting..." : "Accept"}</Button>
                        <Button variant={'destructive'} onClick={() => { handleReject(utxo) }} disabled={rejecting}>{rejecting ? "Rejecting..." : "Reject"}</Button>
                    </div>
                )
            })}
        </>
    )
}
