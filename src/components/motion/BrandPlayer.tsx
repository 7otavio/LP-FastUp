import { useEffect, useRef, useState } from 'react';
import { Player, type PlayerRef } from '@remotion/player';
import { Pause, Play } from 'lucide-react';
import { FastUpFilm, FILM_FPS, FILM_FRAMES, SCENE_FRAMES, SCENES } from './FastUpFilm';

export default function BrandPlayer() {
  const player = useRef<PlayerRef>(null);
  const container = useRef<HTMLDivElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(!document.hidden);
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .1 });
    if (container.current) observer.observe(container.current);
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);

  useEffect(() => {
    if (visible && tabVisible && !userPaused) player.current?.play();
    else player.current?.pause();
  }, [visible, tabVisible, userPaused]);

  useEffect(() => {
    const instance = player.current;
    const onFrame = ({ detail }: { detail: { frame: number } }) => {
      setScene(Math.min(3, Math.floor(detail.frame / SCENE_FRAMES)));
    };
    instance?.addEventListener('frameupdate', onFrame);
    return () => instance?.removeEventListener('frameupdate', onFrame);
  }, []);

  return (
    <div ref={container} data-brand-player data-playing={visible && tabVisible && !userPaused}>
      <div className="film-surface" aria-hidden="true">
        <Player ref={player} component={FastUpFilm} compositionWidth={800} compositionHeight={1000} durationInFrames={FILM_FRAMES} fps={FILM_FPS} loop initiallyMuted controls={false} clickToPlay={false} style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }} numberOfSharedAudioTags={0} />
      </div>
      <div className="film-controls">
        <button type="button" onClick={() => setUserPaused((paused) => !paused)} aria-label={userPaused ? 'Reproduzir apresentação' : 'Pausar apresentação'} className="film-play-button">
          {userPaused ? <Play className="h-4 w-4" fill="currentColor" /> : <Pause className="h-4 w-4" />}
        </button>
        <div className="film-chapters" role="group" aria-label="Cenas da apresentação">
          {SCENES.map((name, index) => (
            <button key={name} type="button" onClick={() => { player.current?.seekTo(index * SCENE_FRAMES + (userPaused ? 90 : 0)); }} aria-label={'Ver cena: ' + name} aria-current={scene === index ? 'step' : undefined} className={scene === index ? 'is-active' : ''}><span /><span>{name}</span></button>
          ))}
        </div>
      </div>
    </div>
  );
}
