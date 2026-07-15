'use client';

import { useEffect, useState } from 'react';

export function CustomCursor() {
 const [position, setPosition] = useState({ x: 0, y: 0 });
 const [isHovering, setIsHovering] = useState(false);
 const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
 // Skip on touch devices
 const isTouch = 'ontouchstart' in window;
 if (isTouch) return;

 const onMove = (e: MouseEvent) => {
 setPosition({ x: e.clientX, y: e.clientY });
 setIsVisible(true);
 
 // Check if hovering interactive element
 const target = e.target as HTMLElement;
 const isInteractive = target.closest(
 'a, button, [role="button"], .magnetic-btn, input, textarea'
 );
 setIsHovering(!!isInteractive);
 };

 const onLeave = () => setIsVisible(false);

 document.addEventListener('mousemove', onMove);
 document.addEventListener('mouseleave', onLeave);

 return () => {
 document.removeEventListener('mousemove', onMove);
 document.removeEventListener('mouseleave', onLeave);
 };
 }, []);

 if (!isVisible) return null;

 return (
 <>
 {/* Outer ring */}
 <div
 className="fixed pointer-events-none z-[9998] transition-[width,height,border-color] duration-200 ease-out"
 style={
 {
 left: position.x,
 top: position.y,
 transform: 'translate(-50%, -50%)',
 width: isHovering ? '40px' : '24px',
 height: isHovering ? '40px' : '24px',
 border: `1px solid ${isHovering ? 'var(--color-brass)' : 'rgba(184,151,94,0.4)'}`,
 borderRadius: '50%',
 mixBlendMode: 'difference',
 }
 }
 />
 
 {/* Inner dot */}
 <div
 className="fixed pointer-events-none z-[9998] transition-opacity duration-200"
 style={
 {
 left: position.x,
 top: position.y,
 transform: 'translate(-50%, -50%)',
 width: '4px',
 height: '4px',
 backgroundColor: 'var(--color-brass)',
 borderRadius: '50%',
 opacity: isHovering ? 0 : 1,
 }
 }
 />
 </>
 );
}

export default CustomCursor;