import { NextResponse } from 'next/server';

type CandidaturePayload = {
  offerUid?: string;
  offerTitle?: string;
  applicantEmail?: string;
  message?: string;
  adminEmails?: string[];
};

const isEmailLike = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CandidaturePayload;
    const applicantEmail = String(payload.applicantEmail ?? '').trim();
    const message = String(payload.message ?? '').trim();
    const offerUid = String(payload.offerUid ?? '').trim();
    const offerTitle = String(payload.offerTitle ?? '').trim();
    const adminEmails = Array.isArray(payload.adminEmails)
      ? payload.adminEmails.filter((email) => typeof email === 'string' && isEmailLike(email))
      : [];

    if (!isEmailLike(applicantEmail) || message.length < 3 || !offerUid) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Payload invalide',
        },
        { status: 400 },
      );
    }

    const logicalEmailPayload = {
      to: adminEmails,
      subject: `Candidature: ${offerTitle || offerUid}`,
      text: `Offre: ${offerUid}\nCandidat: ${applicantEmail}\n\n${message}`,
    };

    console.info('Email dispatch logic payload (stub):', logicalEmailPayload);

    return NextResponse.json({
      ok: true,
      simulated: true,
      message: 'Candidature enregistree. Logique email executee en mode simulation.',
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: 'Erreur serveur',
      },
      { status: 500 },
    );
  }
}
