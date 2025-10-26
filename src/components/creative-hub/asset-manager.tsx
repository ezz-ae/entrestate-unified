
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";

export function AssetManager() {
    const [assets, setAssets] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newAssets = Array.from(e.target.files).map(file => ({
                name: file.name,
                url: URL.createObjectURL(file),
                type: file.type,
            }));
            setAssets([...assets, ...newAssets]);
        }
    };

    return (
        <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
                <CardTitle>Asset Manager</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-2 mb-4">
                    <Input type="file" multiple onChange={handleUpload} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {assets.map((asset, index) => (
                        <div key={index} className="border rounded-lg p-2">
                            {asset.type.startsWith('image/') && (
                                <Image src={asset.url} alt={asset.name} width={150} height={150} className="rounded-lg" />
                            )}
                            <p className="text-sm truncate mt-2">{asset.name}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
