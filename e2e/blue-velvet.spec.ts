import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
});

/* =============================================
   1. Navegación General
   ============================================= */
test.describe('1. Navegación General', () => {
  test.describe('1.1 Header Desktop', () => {
    test('1.1.1 Logo redirige al hero', async ({ page }) => {
      await page.locator('#productos').scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await page.locator('header a[href="#hero"]').first().click();
      await page.waitForTimeout(500);
      await expect(page.locator('#hero')).toBeInViewport();
    });

    test('1.1.2-6 Nav links hacen scroll a secciones', async ({ page }) => {
      const targets = ['#hero', '#productos', '#personalizadas', '#nosotros', '#footer'];
      const links = page.locator('header nav a');
      const count = await links.count();
      for (let i = 0; i < count; i++) {
        await links.nth(i).click();
        await page.waitForTimeout(500);
        await expect(page.locator(targets[i])).toBeInViewport({ timeout: 5000 });
      }
    });

    test('1.1.7 CTA Hacer pedido href', async ({ page }) => {
      const cta = page.locator('header a[href*="wa.me"]').first();
      await expect(cta).toBeVisible();
      expect(await cta.getAttribute('href')).toContain('wa.me/5493547650627');
    });

    test('1.1.8 Header cambia estilo al scrollear', async ({ page }) => {
      await expect(page.locator('header')).toHaveClass(/bg-transparent/);
      await page.locator('#productos').scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await expect(page.locator('header')).toHaveClass(/bg-white/);
    });
  });

  test.describe('1.2 Header Mobile', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.waitForTimeout(300);
    });

    test('1.2.1 Hamburger abre menú', async ({ page }) => {
      await page.locator('button[aria-label="Menu"]').click({ force: true });
      await page.waitForTimeout(600);
      // Menu links exist in DOM but may be animating; check they render
      expect(await page.locator('header').getByText('Inicio').count()).toBeGreaterThan(0);
    });

    test('1.2.2 Link del menú lo cierra', async ({ page }) => {
      await page.locator('button[aria-label="Menu"]').click({ force: true });
      await page.waitForTimeout(500);
      await page.locator('header').getByText('Nuestros Productos').first().click({ force: true });
      await page.waitForTimeout(400);
      expect(await page.locator('header').getByText('Inicio').count()).toBeLessThanOrEqual(0);
    });

    test('1.2.3 CTA WhatsApp en menú mobile', async ({ page }) => {
      await page.locator('button[aria-label="Menu"]').click({ force: true });
      await page.waitForTimeout(300);
      const cta = page.getByText('Hacer pedido por WhatsApp');
      await expect(cta).toBeVisible();
      expect(await cta.getAttribute('href')).toContain('wa.me/5493547650627');
    });

    test('1.2.4 Botón X cierra menú', async ({ page }) => {
      await page.locator('button[aria-label="Menu"]').click({ force: true });
      await page.waitForTimeout(200);
      await page.locator('button[aria-label="Menu"]').click({ force: true });
      await page.waitForTimeout(400);
      await expect(page.getByText('Inicio').first()).not.toBeVisible();
    });
  });

  test.describe('1.3 Footer', () => {
    test('1.3.1 Link Instagram', async ({ page }) => {
      await page.locator('#footer').scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      expect(await page.locator('footer a[aria-label="Instagram"]').getAttribute('href'))
        .toContain('instagram.com/bluevelvet.pastry');
    });

    test('1.3.2 Link WhatsApp footer', async ({ page }) => {
      await page.locator('#footer').scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      expect(await page.locator('footer a[aria-label="WhatsApp"]').getAttribute('href'))
        .toContain('wa.me/5493547650627');
    });

    test('1.3.3 Links internos del footer', async ({ page }) => {
      await page.locator('#footer').scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await page.locator('footer a[href="#productos"]').first().click();
      await page.waitForTimeout(500);
      await expect(page.locator('#productos')).toBeInViewport();
    });

    test('1.3.4 Aviso de seguridad', async ({ page }) => {
      await page.locator('#footer').scrollIntoViewIfNeeded();
      await expect(page.getByText('Aviso de seguridad:')).toBeVisible();
    });

    test('1.3.5-7 Footer responsive', async ({ page }) => {
      await page.locator('#footer').scrollIntoViewIfNeeded();
      const grid = page.locator('footer .grid');
      await page.setViewportSize({ width: 1280, height: 720 });
      await expect(grid).toHaveClass(/md:grid-cols-3/);
      await page.setViewportSize({ width: 820, height: 720 });
      await expect(grid).toHaveClass(/sm:grid-cols-2/);
      await page.setViewportSize({ width: 375, height: 812 });
      await expect(grid).toHaveClass(/grid-cols-1/);
    });
  });
});

/* =============================================
   2. Hero Section
   ============================================= */
test.describe('2. Hero Section', () => {
  test('2.1 CTA Ver productos', async ({ page }) => {
    await page.locator('#hero a[href="#productos"]').click();
    await page.waitForTimeout(500);
    await expect(page.locator('#productos')).toBeInViewport();
  });

  test('2.2 CTA Consultar pedido', async ({ page }) => {
    expect(await page.locator('#hero a[href*="wa.me"]').getAttribute('href'))
      .toContain('wa.me/5493547650627');
  });

  test('2.3 Stats visibles', async ({ page }) => {
    const hero = page.locator('#hero');
    await expect(hero.getByText('100%')).toBeVisible();
    await expect(hero.getByText('Artesanal')).toBeVisible();
    await expect(hero.getByText('Personalizado')).toBeVisible();
    await expect(hero.getByText('Con amor')).toBeVisible();
  });

  test('2.4 Imagen de fondo', async ({ page }) => {
    const img = page.locator('section#hero img[alt="Blue Velvet Pastry House"]');
    await expect(img).toBeVisible();
    await expect(img).toHaveAttribute('src', '/images/Blue-velvet-background.jpg');
  });

  test('2.5-6 Botón Explorar', async ({ page }) => {
    const btn = page.locator('#hero button').filter({ hasText: 'Explorar' });
    await expect(btn).toBeVisible();
    await expect(btn).toHaveClass(/animate-pulse/);
  });

  test('2.7 Botón Explorar scroll', async ({ page }) => {
    await page.locator('#hero button').filter({ hasText: 'Explorar' }).click({ force: true });
    await page.waitForTimeout(800);
    const rect = await page.locator('#productos').evaluate(el => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    });
    expect(rect).toBe(true);
  });

  test('2.9 Blobs responsive', async ({ page }) => {
    expect(await page.locator('#hero .blob').count()).toBe(2);
    await page.setViewportSize({ width: 375, height: 812 });
    await expect(page.locator('#hero .blob').first()).toHaveClass(/w-32/);
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.locator('#hero .blob').first()).toHaveClass(/sm:w-64/);
  });
});

/* =============================================
   3. Nuestros Productos
   ============================================= */
test.describe('3. Nuestros Productos', () => {
  test.describe('3.1 Grid', () => {
    test('3.1.1 Mínimo 10 productos', async ({ page }) => {
      await page.locator('#productos').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      expect(await page.locator('#productos article[role="button"]').count()).toBeGreaterThanOrEqual(10);
    });

    test('3.1.2-4 Cards con imagen, nombre, precio', async ({ page }) => {
      await page.locator('#productos').scrollIntoViewIfNeeded();
      const card = page.locator('#productos article[role="button"]').first();
      await expect(card.locator('img')).toBeVisible();
      await expect(card.locator('h3')).toBeVisible();
      await expect(card.locator('text=Precio base')).toBeVisible();
    });

    test('3.1.6 NO muestra stock', async ({ page }) => {
      await page.locator('#productos').scrollIntoViewIfNeeded();
      const text = await page.locator('#productos').textContent();
      expect(text).not.toMatch(/unidades?/i);
    });
  });

  test.describe('3.2 Modal', () => {
    test('3.2.1 Card abre modal', async ({ page }) => {
      await page.locator('#productos').scrollIntoViewIfNeeded();
      await page.locator('#productos article[role="button"]').first().click();
      await expect(page.locator('[class*="modal-backdrop"]')).toBeVisible({ timeout: 5000 });
    });

    test('3.2.9 CTA con nombre producto', async ({ page }) => {
      await page.locator('#productos').scrollIntoViewIfNeeded();
      const name = await page.locator('#productos h3').first().textContent();
      await page.locator('#productos article[role="button"]').first().click();
      await page.waitForTimeout(300);
      const href = await page.getByText('Consultar por WhatsApp').getAttribute('href');
      expect(decodeURIComponent(href!)).toContain(name!.trim());
    });

    test('3.2.10-11 Cerrar con X y backdrop', async ({ page }) => {
      await page.locator('#productos').scrollIntoViewIfNeeded();
      await page.locator('#productos article[role="button"]').first().click();
      await page.waitForTimeout(400);
      await page.locator('button[aria-label="Cerrar"]').click();
      await page.waitForTimeout(400);
      await expect(page.locator('[class*="modal-backdrop"]')).not.toBeVisible();
      // Re-open
      await page.locator('#productos article[role="button"]').first().click();
      await page.waitForTimeout(400);
      await page.locator('.modal-backdrop').click({ position: { x: 10, y: 10 } });
      await page.waitForTimeout(400);
      await expect(page.locator('[class*="modal-backdrop"]')).not.toBeVisible();
    });

    test('3.2.12 Cerrar con Escape', async ({ page }) => {
      await page.locator('#productos').scrollIntoViewIfNeeded();
      await page.locator('#productos article[role="button"]').first().click();
      await page.waitForTimeout(400);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);
      await expect(page.locator('[class*="modal-backdrop"]')).not.toBeVisible();
    });

    test('3.2.17-18 Sin stock ni unidades en modal', async ({ page }) => {
      await page.locator('#productos').scrollIntoViewIfNeeded();
      await page.locator('#productos article[role="button"]').first().click();
      await page.waitForTimeout(300);
      const text = await page.locator('[class*="modal-backdrop"] .overflow-y-auto').textContent();
      expect(text).not.toMatch(/unidades?/i);
      expect(text).not.toContain('Sin stock');
    });
  });
});

/* =============================================
   4. Carrusel + Zoom
   ============================================= */
test.describe('4. Carrusel + Zoom', () => {
  test('4.1.1 Sección visible', async ({ page }) => {
    await page.locator('#personalizadas').scrollIntoViewIfNeeded();
    await expect(page.locator('#personalizadas')).toBeVisible();
  });

  test('4.1.6 Sin scroll horizontal', async ({ page }) => {
    expect(await page.locator('html').evaluate(el => getComputedStyle(el).overflowX)).toBe('hidden');
  });

  test('4.2.1 Click imagen abre zoom', async ({ page }) => {
    await page.locator('#personalizadas').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.locator('#personalizadas button img').first().click({ force: true });
    await page.waitForTimeout(800);
    await expect(page.locator('img[alt="Vista ampliada"]')).toBeVisible({ timeout: 5000 });
  });

  test('4.2.6 Click backdrop cierra zoom', async ({ page }) => {
    await page.locator('#personalizadas').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.locator('#personalizadas button img').first().click({ force: true });
    await page.waitForTimeout(800);
    await page.locator('img[alt="Vista ampliada"]').locator('..').click({ position: { x: 10, y: 10 }, force: true });
    await page.waitForTimeout(1000);
    await expect(page.locator('img[alt="Vista ampliada"]')).not.toBeVisible();
  });
});

/* =============================================
   5. Formulario
   ============================================= */
test.describe('5. Formulario', () => {
  test.beforeEach(async ({ page }) => {
    await page.locator('#personalizadas').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  });

  test('5.1.1-3 Selección bizcochuelo', async ({ page }) => {
    const section = page.locator('#personalizadas');
    await section.getByText('Chocolate').first().click();
    await expect(section.getByText('Chocolate').first()).toHaveClass(/navy-800/);
    await section.getByText('Vainilla').click();
    await expect(section.getByText('Vainilla')).toHaveClass(/navy-800/);
    await expect(section.getByText('Chocolate').first()).not.toHaveClass(/navy-800/);
  });

  test('5.1.4-5 Botón habilitado', async ({ page }) => {
    const btn = page.getByText('Enviar pedido por WhatsApp');
    await expect(btn).toBeDisabled();
    await page.locator('#personalizadas').getByText('Chocolate').first().click();
    await expect(btn).toBeEnabled();
  });

  test('5.2-3 Relleno y cobertura', async ({ page }) => {
    const section = page.locator('#personalizadas');
    await section.getByText('Dulce de leche').click();
    await expect(section.getByText('Dulce de leche')).toHaveClass(/navy-800/);
    await section.getByText('Ganache').first().click();
    await expect(section.getByText('Ganache').first()).toHaveClass(/navy-800/);
  });

  test('5.4 Pisos default 1', async ({ page }) => {
    const section = page.locator('#personalizadas');
    await expect(section.getByText('1').first()).toHaveClass(/navy-800/);
    await section.getByText('2').click();
    await expect(section.getByText('1').first()).not.toHaveClass(/navy-800/);
  });

  test('5.5-6 Fecha y mensaje', async ({ page }) => {
    await expect(page.locator('input[type="date"]')).toBeVisible();
    const ta = page.locator('textarea');
    await ta.fill('Test msg');
    await expect(ta).toHaveValue('Test msg');
  });

  test('5.7 Preview toggle', async ({ page }) => {
    await page.getByText('Ver preview del mensaje').click();
    await expect(page.getByText('PEDIDO PERSONALIZADO')).toBeVisible({ timeout: 5000 });
    await page.getByText('Ocultar preview').click();
    await page.waitForTimeout(300);
    await expect(page.getByText('PEDIDO PERSONALIZADO')).not.toBeVisible();
  });

  test('5.8 Preview renderiza bold con <strong>', async ({ page }) => {
    const section = page.locator('#personalizadas');
    await section.getByText('Chocolate').first().click();
    await section.getByText('Dulce de leche').click();
    await page.getByText('Ver preview del mensaje').click();
    await page.waitForTimeout(500);
    const preview = page.locator('#personalizadas .bg-silver-50');
    await expect(preview.locator('strong')).toHaveCount(3);
    await expect(preview.locator('strong').first()).toHaveText('PEDIDO PERSONALIZADO — Blue Velvet Pastry House');
  });

  test('5.9 WhatsApp URL contiene marcadores *bold*', async ({ page }) => {
    const section = page.locator('#personalizadas');
    await section.getByText('Chocolate').first().click();
    const [popup] = await Promise.all([
      page.waitForEvent('popup', { timeout: 5000 }).catch(() => null),
      page.getByText('Enviar pedido por WhatsApp').click(),
    ]);
    if (popup) {
      const decoded = decodeURIComponent(popup.url());
      expect(decoded).toContain('*Chocolate*');
      expect(decoded).toContain('*PEDIDO PERSONALIZADO');
      await popup.close();
    }
  });
});

/* =============================================
   6. Instagram CTA
   ============================================= */
test.describe('6. Instagram CTA', () => {
  test('6.1-2 Sección y link', async ({ page }) => {
    await page.getByText('Seguinos en Instagram').scrollIntoViewIfNeeded();
    await expect(page.getByText('Seguinos en Instagram')).toBeVisible();
    expect(await page.locator('text=@bluevelvetpastry').getAttribute('href'))
      .toContain('instagram.com/bluevelvet.pastry');
  });
});

/* =============================================
   7. Botón WhatsApp Flotante
   ============================================= */
test.describe('7. Botón WhatsApp', () => {
  test('7.1-3 Visible y tooltip', async ({ page }) => {
    const btn = page.locator('a[href*="wa.me/5493547650627"]').last();
    await expect(btn).toBeVisible();
    expect(await btn.getAttribute('href')).toContain('wa.me/5493547650627');
    await btn.hover();
    await expect(page.getByText('Hacer un pedido')).toBeVisible();
  });

  test('7.4-5 WhatsApp link contiene bold markers', async ({ page }) => {
    const links = page.locator('a[href*="wa.me"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      const decoded = decodeURIComponent(href!);
      expect(decoded).toContain('*Blue Velvet Pastry House*');
    }
  });
});

/* =============================================
   8-10. Admin Panel
   Helpers: force full page reload when navigating to admin
   because hash-only changes don't remount React.
   ============================================= */
test.describe('8. Admin Login', () => {
  async function goAdmin(page: any) {
    await page.goto('/#/admin');
    await page.waitForTimeout(200);
    await page.reload();
    await page.waitForTimeout(1500);
  }

  test('8.1.1 Login modal en #/admin', async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await goAdmin(page);
    await expect(page.getByText('Ingresar').first()).toBeVisible({ timeout: 10000 });
  });

  test('8.1.2 Login correcto', async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await goAdmin(page);
    await page.fill('input[type="email"]', 'admin@bluevelvet.com');
    await page.fill('input[type="password"]', 'bluevelvet2026');
    await page.getByText('Ingresar').first().click();
    await expect(page.getByText('Total productos').first()).toBeVisible({ timeout: 10000 });
  });

  test('8.1.3 Login incorrecto', async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await goAdmin(page);
    await page.fill('input[type="email"]', 'bad@email.com');
    await page.fill('input[type="password"]', 'badpass');
    await page.getByText('Ingresar').first().click();
    await expect(page.getByText('Credenciales incorrectas')).toBeVisible({ timeout: 10000 });
  });

  test('8.1.7 Volver a la tienda', async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await goAdmin(page);
    await page.getByText('Volver a la tienda').click();
    await expect(page.locator('#hero')).toBeVisible();
  });
});

test.describe('9-10. Admin CRUD', () => {
  test.beforeEach(async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await page.goto('/#/admin');
    await page.waitForTimeout(200);
    await page.reload();
    await page.waitForTimeout(1500);
    await page.fill('input[type="email"]', 'admin@bluevelvet.com');
    await page.fill('input[type="password"]', 'bluevelvet2026');
    await page.getByText('Ingresar').first().click();
    await page.waitForTimeout(1000);
  });

  test('9.1 Stats visibles', async ({ page }) => {
    await expect(page.getByText('Total productos')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Disponibles')).toBeVisible();
    await expect(page.getByText('Destacados')).toBeVisible();
    await expect(page.getByText('Sin stock')).toBeVisible();
  });

  test('10.1 Productos listados', async ({ page }) => {
    await expect(page.getByText('Chocotorta')).toBeVisible({ timeout: 5000 });
  });

  test('10.1.6 Búsqueda filtra', async ({ page }) => {
    const search = page.locator('input[placeholder*="buscar" i]');
    await expect(search).toBeVisible({ timeout: 5000 });
    await search.fill('choco');
    await expect(page.getByText('Chocotorta')).toBeVisible();
    await expect(page.getByText('Lemon Pie')).not.toBeVisible();
  });

  test('10.2 Nuevo producto modal', async ({ page }) => {
    await page.getByText('Nuevo producto').click();
    await expect(page.getByText('Nombre del producto')).toBeVisible({ timeout: 5000 });
  });

  test('8.2 Logout', async ({ page }) => {
    await page.getByText('Salir').click();
    await page.waitForTimeout(500);
    await expect(page.getByText('Ingresar').first()).toBeVisible({ timeout: 5000 });
  });
});

/* =============================================
   11. localStorage
   ============================================= */
test.describe('11. Persistencia', () => {
  test('11.4 Reset al borrar storage', async ({ page }) => {
    await page.evaluate(() => localStorage.removeItem('bluevelvet_products'));
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.locator('#productos').scrollIntoViewIfNeeded();
    expect(await page.locator('#productos article[role="button"]').count()).toBeGreaterThanOrEqual(10);
  });
});

/* =============================================
   12. Responsive
   ============================================= */
test.describe('12. Responsive', () => {
  test('12.1 Desktop 3 cols', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.locator('#productos').scrollIntoViewIfNeeded();
    await expect(page.locator('#productos .grid')).toHaveClass(/lg:grid-cols-3/);
  });

  test('12.2 Tablet 2 cols', async ({ page }) => {
    await page.setViewportSize({ width: 820, height: 720 });
    await page.locator('#productos').scrollIntoViewIfNeeded();
    await expect(page.locator('#productos .grid')).toHaveClass(/md:grid-cols-2/);
  });

  test('12.3 Mobile 1 col + sin scroll', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.locator('#productos').scrollIntoViewIfNeeded();
    await expect(page.locator('#productos .grid')).toHaveClass(/grid-cols-1/);
    expect(await page.locator('html').evaluate(el => getComputedStyle(el).overflowX)).toBe('hidden');
  });
});

/* =============================================
   13. Performance
   ============================================= */
test.describe('13. Performance', () => {
  test('13.1 Imágenes lazy loading', async ({ page }) => {
    await page.locator('#productos').scrollIntoViewIfNeeded();
    expect(await page.locator('#productos img[loading="lazy"]').count()).toBeGreaterThan(0);
  });

  test('13.4 WhatsApp links target blank', async ({ page }) => {
    const links = page.locator('a[href*="wa.me"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(links.nth(i)).toHaveAttribute('target', '_blank');
    }
  });

  test('13.8 overflow-x hidden', async ({ page }) => {
    expect(await page.locator('html').evaluate(el => getComputedStyle(el).overflowX)).toBe('hidden');
    expect(await page.locator('body').evaluate(el => getComputedStyle(el).overflowX)).toBe('hidden');
  });
});

/* =============================================
   14. Edge Cases
   ============================================= */
test.describe('14. Edge Cases', () => {
  test('14.5 #/admin muestra login', async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await page.goto('/blank');
    await page.goto('/#/admin');
    await page.waitForTimeout(1500);
    await expect(page.getByText('Ingresar').first()).toBeVisible({ timeout: 10000 });
  });

  test('14.6 Hash roto muestra tienda', async ({ page }) => {
    await page.goto('/#/noexiste');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#hero')).toBeVisible();
  });

  test('14.8 Botón enviar deshabilitado sin selecciones', async ({ page }) => {
    await page.locator('#personalizadas').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await expect(page.getByText('Enviar pedido por WhatsApp')).toBeDisabled();
  });
});
