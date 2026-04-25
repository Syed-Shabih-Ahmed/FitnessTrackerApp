import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, StatusBar,
  TouchableOpacity, ActivityIndicator, ScrollView,
} from 'react-native';
import { motivationalQuotes } from '../data/exercises';

export default function QuotesScreen() {
  const [shownQuote, setShownQuote] = useState(motivationalQuotes[0]);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fetching, setFetching] = useState(false);

  const loadFromWeb = async () => {
    setFetching(true);
    try {
      const res = await fetch('https://api.quotable.io/quotes/random?tags=inspirational');
      const data = await res.json();
      if (data && data[0]) {
        setShownQuote({ quote: data[0].content, author: data[0].author });
      }
    } catch {
      const fallback = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      setShownQuote(fallback);
    } finally {
      setFetching(false);
    }
  };

  const showNextLocal = () => {
    const nextIdx = (quoteIndex + 1) % motivationalQuotes.length;
    setQuoteIndex(nextIdx);
    setShownQuote(motivationalQuotes[nextIdx]);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar barStyle="light-content" backgroundColor="#1565C0" />

      <View style={styles.topBar}>
        <Text style={styles.screenTitle}>Motivational Quotes</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollArea}>

        <View style={styles.featuredQuote}>
          <Text style={styles.openQuote}>"</Text>
          {fetching ? (
            <ActivityIndicator color="#1565C0" size="large" style={{ marginVertical: 20 }} />
          ) : (
            <>
              <Text style={styles.quoteBody}>{shownQuote.quote}</Text>
              <Text style={styles.quoteWriter}>— {shownQuote.author}</Text>
            </>
          )}
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={loadFromWeb}>
            <Text style={styles.actionBtnText}>Load from Web</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.actionBtnOutline]} onPress={showNextLocal}>
            <Text style={styles.actionBtnOutlineText}>Next Quote</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.listHeading}>All Quotes</Text>
        {motivationalQuotes.map((q, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.quoteRow, quoteIndex === i && styles.quoteRowActive]}
            onPress={() => { setQuoteIndex(i); setShownQuote(q); }}
          >
            <Text style={styles.quoteRowText} numberOfLines={2}>{q.quote}</Text>
            <Text style={styles.quoteRowAuthor}>— {q.author}</Text>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#F0F4FF' },
  topBar: { padding: 16, backgroundColor: '#1565C0' },
  screenTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  scrollArea: { padding: 16, paddingBottom: 40 },
  featuredQuote: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#BBDEFB',
    borderLeftWidth: 5,
    borderLeftColor: '#1565C0',
    minHeight: 150,
    justifyContent: 'center',
  },
  openQuote: { fontSize: 40, color: '#1565C0', fontWeight: 'bold', marginBottom: 6 },
  quoteBody: { fontSize: 16, color: '#333', lineHeight: 26, marginBottom: 12 },
  quoteWriter: { fontSize: 14, color: '#888', fontStyle: 'italic' },
  actionRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  actionBtn: {
    flex: 1,
    backgroundColor: '#1565C0',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  actionBtnOutline: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#1565C0' },
  actionBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  actionBtnOutlineText: { color: '#1565C0', fontWeight: 'bold', fontSize: 13 },
  listHeading: { fontSize: 15, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  quoteRow: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  quoteRowActive: { borderColor: '#1565C0', backgroundColor: '#E3F2FD' },
  quoteRowText: { fontSize: 13, color: '#555', lineHeight: 20 },
  quoteRowAuthor: { fontSize: 12, color: '#999', marginTop: 4 },
});
