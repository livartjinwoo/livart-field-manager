"use client";
 
import { useState } from "react";
import { supabase } from "../lib/supabase";
 
export default function Home() {
const [siteName, setSiteName] = useState("");
const [companyName, setCompanyName] = useState("");
const [managerName, setManagerName] = useState("");
const [workType, setWorkType] = useState("출고전");
const [remark, setRemark] = useState("");
const [photoFile, setPhotoFile] = useState<File | null>(null);
 
const handleSubmit = async () => {
try {
let photoUrl = "";
 
if (photoFile) {
const fileName = `${Date.now()}-${photoFile.name}`;
 
const { data: uploadData, error: uploadError } =
await supabase.storage
.from("Photos")
.upload(fileName, photoFile);
 
if (uploadError) {
alert("사진 업로드 실패");
console.log(uploadError);
return;
}
 
const { data } = supabase.storage
.from("Photos")
.getPublicUrl(fileName);
 
photoUrl = data.publicUrl;
}
 
const { error } = await supabase.from("uploads").insert([
{
site_name: siteName,
company_name: companyName,
manager_name: managerName,
work_type: workType,
remark: remark,
photo_url: photoUrl,
},
]);
 
if (error) {
alert("DB 저장 실패");
console.log(error);
return;
}
 
alert("등록 완료");
 
setSiteName("");
setCompanyName("");
setManagerName("");
setWorkType("출고전");
setRemark("");
setPhotoFile(null);
} catch (err) {
console.log(err);
alert("오류 발생");
}
};
 
return (
<main
style={{
minHeight: "100vh",
backgroundColor: "#f3f4f6",
display: "flex",
justifyContent: "center",
alignItems: "center",
padding: "20px",
}}
>
<div
style={{
background: "#fff",
padding: "30px",
borderRadius: "16px",
width: "100%",
maxWidth: "600px",
boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
}}
>
<h1
style={{
textAlign: "center",
marginBottom: "20px",
}}
>
리바트 현장관리 시스템
</h1>
 
<div
style={{
display: "flex",
flexDirection: "column",
gap: "15px",
}}
>
<input
type="text"
placeholder="현장명"
value={siteName}
onChange={(e) => setSiteName(e.target.value)}
style={{ padding: "12px" }}
/>
 
<input
type="text"
placeholder="업체명"
value={companyName}
onChange={(e) => setCompanyName(e.target.value)}
style={{ padding: "12px" }}
/>
 
<input
type="text"
placeholder="담당자"
value={managerName}
onChange={(e) => setManagerName(e.target.value)}
style={{ padding: "12px" }}
/>
 
<select
value={workType}
onChange={(e) => setWorkType(e.target.value)}
style={{ padding: "12px" }}
>
<option>출고전</option>
<option>설치중</option>
<option>설치완료</option>
<option>하자</option>
</select>
 
<textarea
placeholder="특이사항"
rows={4}
value={remark}
onChange={(e) => setRemark(e.target.value)}
style={{ padding: "12px" }}
/>
 
<div>
<p>📷 사진 업로드</p>
 
<input
type="file"
accept="image/*"
onChange={(e) =>
setPhotoFile(
e.target.files ? e.target.files[0] : null
)
}
/>
 
<div style={{ marginTop: "5px", color: "gray" }}>
선택된 파일 :
{photoFile ? photoFile.name : " 없음"}
</div>
</div>
 
<button
onClick={handleSubmit}
style={{
padding: "14px",
backgroundColor: "#2563eb",
color: "#fff",
border: "none",
borderRadius: "8px",
cursor: "pointer",
}}
>
등록하기
</button>
</div>
</div>
</main>
);
} 