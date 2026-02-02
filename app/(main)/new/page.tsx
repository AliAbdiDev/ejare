import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { Select } from "@/core/components/ui/select";
import { Textarea } from "@/core/components/ui/textarea";

function Page() {
    return (
        <>
            <section className="space-y-6">
                <div className="">
                    <Label htmlFor="new-title" className="pb-3 pr-1">عنوان آگهی</Label>
                    <Input id="new-title" />
                </div>
                <div className="">
                    <Label htmlFor="new-desc" className="pb-3 pr-1">توضیحات آگهی</Label>
                    <Textarea id="new-desc" />
                </div>

               
            </section>
        </>
        );
}

export default Page;