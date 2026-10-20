/* SheetJS CE 0.20.3, locally bundled. Workbook data stays in this worker. */
importScripts('./xlsx.full.min.js');
self.onmessage=e=>{
 try{
  const wb=XLSX.read(e.data,{type:'array',dense:true,sheetRows:5001,cellHTML:false,cellFormula:false,bookVBA:false});
  const sheets=wb.SheetNames.map(name=>{
   const ws=wb.Sheets[name],ref=ws['!ref']||'A1',range=XLSX.utils.decode_range(ref),full=XLSX.utils.decode_range(ws['!fullref']||ref);
   const endRow=Math.min(range.e.r,range.s.r+4999),endCol=Math.min(range.e.c,range.s.c+99),bounded={s:range.s,e:{r:endRow,c:endCol}};
   const rows=ws['!ref']?XLSX.utils.sheet_to_json(ws,{header:1,raw:false,blankrows:true,range:bounded}):[];
   return{name,rows,startRow:range.s.r,startColumn:range.s.c,rowCount:full.e.r-full.s.r+1,columnCount:full.e.c-full.s.c+1,columns:Math.max(1,endCol-range.s.c+1),limited:full.e.r>endRow||full.e.c>endCol};
  });
  if(!sheets.length)throw new Error('empty');self.postMessage({sheets});
 }catch(e){self.postMessage({error:'تعذّر قراءة جدول Excel. قد يكون الملف محمياً بكلمة مرور أو غير صالح.'})}
};
