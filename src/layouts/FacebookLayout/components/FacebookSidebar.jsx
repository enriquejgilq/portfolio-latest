import { Globe, MapPin, Search, Twitter, Github, Linkedin, Briefcase, Mail } from "lucide-react";

export default function FacebookSidebar({ profile, projects }) {
  // Las redes sociales vienen como un objeto { github, linkedin, ... } en profile.socialMedia
  const sm = profile?.socialMedia || {};
  const socialLinks = Object.entries(sm)
    .filter(([_, link]) => link && typeof link === 'string')
    .map(([name, link]) => ({ name, link }));

  // Extraer las primeras 9 imágenes de todos los proyectos para el widget
  const sidebarPhotos = (projects || [])
    .flatMap(p => p.images || [])
    .slice(0, 9);

  return (
    <aside className="w-full lg:w-[360px] p-4 flex flex-col gap-4">
      {/* Intro Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="text-xl font-black text-gray-900 mb-4 tracking-tight">Presentación</h3>
        
        {profile?.bio && (
          <p className="text-center text-gray-800 mb-6 font-medium leading-relaxed italic bg-blue-50/50 p-3 rounded-lg border border-blue-50">
            "{profile.bio}"
          </p>
        )}

        <div className="space-y-4">
          {profile?.location && (
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="w-6 h-6 text-gray-400 shrink-0" />
              <span className="text-sm">Vive en <span className="font-bold">{profile.location}</span></span>
            </div>
          )}
          
          <div className="flex items-center gap-3 text-gray-700">
            <Briefcase className="w-6 h-6 text-gray-400 shrink-0" />
            <span className="text-sm">Desarrollador en <span className="font-bold text-blue-600">Portafolio Pro</span></span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <Globe className="w-6 h-6 text-gray-400 shrink-0" />
            <span className="text-sm">Sitio web <a href="#" className="font-bold text-blue-600 hover:underline">misitio.com</a></span>
          </div>

          {socialLinks.map((social, idx) => (
             social?.link && (
               <a key={idx} href={social.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:bg-gray-50 p-2 rounded-lg transition-colors group">
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    {social.name?.toLowerCase().includes('github') ? <Github className="w-5 h-5 text-gray-900" /> :
                     social.name?.toLowerCase().includes('twitter') || social.name?.toLowerCase().includes('x') ? <Twitter className="w-5 h-5 text-sky-500" /> :
                     social.name?.toLowerCase().includes('linkedin') ? <Linkedin className="w-5 h-5 text-blue-700" /> :
                     <Globe className="w-5 h-5 text-gray-500" />}
                  </div>
                  <span className="text-sm font-medium group-hover:text-blue-600 capitalize text-gray-800">{social.name}</span>
               </a>
             )
          ))}
        </div>
      </div>

      {/* Aesthetic Photos Card (Projects Preview) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Fotos</h3>
          <button className="text-blue-600 text-sm font-medium hover:bg-blue-50 px-2 py-1 rounded transition-colors">Ver todas las fotos</button>
        </div>
        <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden bg-gray-100 min-h-[150px]">
          {sidebarPhotos.length > 0 ? (
            sidebarPhotos.map((img, idx) => (
              <div key={idx} className="aspect-square bg-gray-200 hover:opacity-90 cursor-pointer overflow-hidden border-[0.5px] border-white">
                <img src={img} className="w-full h-full object-cover" alt={`Preview ${idx}`} />
              </div>
            ))
          ) : (
            <div className="col-span-3 flex flex-col items-center justify-center p-10 text-gray-400">
               <span className="text-xs font-medium">No hay fotos aún</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
