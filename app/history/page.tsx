"use client";
 
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
 
export default function HistoryPage() {
const [items, setItems] = useState<any[]>([]);
 
useEffect(() => {
loadData();
async function deleteItem(id: number) {
const ok = confirm("정말 삭제할까요?");
 
if (!ok) return;
 
const { error } = await supabase
.from("uploads")
.delete()
.eq("id", id);
 
if (error) {
alert("삭제 실패");
} else {
alert("삭제 완료");
loadData();
}
}
}, []);

async function loadData() {
const { data } = await supabase
.from("uploads")
.select("*")
.order("created_at", { ascending: false });
 
setItems(data || []);
}
 
return (
<div style={{ padding: "20px" }}>
<h1>등록 이력 조회</h1>
 
{items.map((item) => (
<div
key={item.id}
style={{
border: "1px solid #ddd",
padding: "15px",
marginBottom: "15px",
borderRadius: "10px",
}}
>
<p>현장명 : {item.site_name}</p>
<p>업체명 : {item.company_name}</p>
<p>담당자 : {item.manager_name}</p>
<p>작업구분 : {item.work_type}</p>
<p>특이사항 : {item.remark}</p>
<button
onClick={() => deleteItem(item.id)}
style={{
marginTop: "10px",
padding: "8px 12px",
backgroundColor: "red",
color: "white",
border: "none",
borderRadius: "5px",
cursor: "pointer",
}}
>
삭제
</button>
 
{item.photo_url && (
<div>
<p>사진 주소</p>
<p>{item.photo_url}</p>
</div>
)}
</div>
))}
</div>
);
}
