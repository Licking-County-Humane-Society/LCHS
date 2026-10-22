/* Browser-local PDF creation. No uploads or network requests. */
(function(root){
async function buildVolunteerPDF(data, signatures, template){
 const {PDFDocument,StandardFonts,rgb}=root.PDFLib;
 const pdf=await PDFDocument.load(template);const form=pdf.getForm();const font=await pdf.embedFont(StandardFonts.Helvetica);
 const set=(n,v)=>{const f=form.getTextField(n);f.setText(v||'');f.setFontSize(0);};
 set('volunteer_name',data.fullName);set('volunteer_email',data.email);set('dob',data.dob);set('waiver_print_name',data.fullName);set('waiver_date',data.date);set('waiver_name_date',data.date);
 for(const p of ['social',data.photo==='yes'?'photo_permission':'photo_optout']){set(p+'_name',data.fullName);set(p+'_signature_date',data.date);set(p+'_name_date',data.date);}
 if(data.photo==='no')set('photo_optout_statement_name',data.fullName);
 const jobs=[['waiver_signature',signatures.waiver],['social_signature',signatures.social],[(data.photo==='yes'?'photo_permission':'photo_optout')+'_signature',signatures.photo]];
 if(data.minor){set('guardian_name',data.guardianName);set('guardian_relationship',data.relationship);set('guardian_signature_date',data.date);set('guardian_name_date',data.date);jobs.push(['guardian_signature',signatures.guardian]);}
 if(data.under16){let prefix='no_chaperones';if(data.chaperones.length){prefix='chaperones_authorization';data.chaperones.forEach((p,i)=>{set('chaperone_'+(i+1),p.name);set('chaperone_relationship_'+(i+1),p.relationship);});}set(prefix+'_name_relationship',data.guardianName+' — '+data.relationship);set(prefix+'_date',data.date);jobs.push([prefix+'_signature',signatures.under16]);}
 // Capture each widget's page and rectangle before removing the editable fields.
 const placements=jobs.map(([name,sig])=>{if(!sig)throw Error('A required signature is missing.');const w=form.getTextField(name).acroField.getWidgets()[0];const ref=w.P();let page=pdf.getPages().find(p=>p.ref===ref||p.ref.toString()===ref?.toString());if(!page)page=pdf.getPages().find(p=>p.node.Annots()?.asArray().some(r=>pdf.context.lookup(r)===w.dict));if(!page)throw Error('Could not locate signature field.');return {rect:w.getRectangle(),page,sig};});
 form.updateFieldAppearances(font);form.flatten();
 for(const {rect:r,page,sig} of placements){if(sig.type==='draw'){const img=await pdf.embedPng(sig.value);const scale=Math.min((r.width-6)/img.width,(r.height-4)/img.height);page.drawImage(img,{x:r.x+3,y:r.y+(r.height-img.height*scale)/2,width:img.width*scale,height:img.height*scale});}else{const f=await pdf.embedFont(StandardFonts.TimesRomanItalic);const size=Math.min(17,(r.width-6)/Math.max(1,f.widthOfTextAtSize(sig.value,1)));page.drawText(sig.value,{x:r.x+3,y:r.y+(r.height-size)/2+2,size,font:f,color:rgb(.08,.15,.18)});}}
 pdf.setTitle('Completed LCHS volunteer packet');pdf.setAuthor('');pdf.setSubject('Volunteer forms completed locally');return pdf.save();
}
root.buildVolunteerPDF=buildVolunteerPDF;
})(typeof window!=='undefined'?window:globalThis);
