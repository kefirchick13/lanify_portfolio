export function EmptyGallery({year,onReset}:{year:string|null;onReset:()=>void}){
 return <section className="empty-gallery" aria-label="No works found">
  <div className="empty-gallery-copy">
   <p className="empty-gallery-code" aria-hidden="true">404</p>
   <h2>WORKS NOT FOUND</h2>
   <p className="empty-gallery-message">{year?`No works for ${year}. Try another year.`:'Nothing on this sheet yet.'}</p>
   {year&&<button type="button" className="empty-gallery-reset" onClick={onReset}>SHOW ALL WORKS <span aria-hidden="true">↗</span></button>}
  </div>
 </section>;
}
